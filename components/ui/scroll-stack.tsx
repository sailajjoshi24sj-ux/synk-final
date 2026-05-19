"use client"

import { useLayoutEffect, useRef, useCallback } from "react"
import "./scroll-stack.css"

// ── helpers ───────────────────────────────────────────────────────────────────

/** Walk offsetParent chain — unaffected by CSS transforms */
function getAbsoluteTop(el: HTMLElement): number {
  let top = 0
  let node: HTMLElement | null = el
  while (node) {
    top += node.offsetTop
    node = node.offsetParent as HTMLElement | null
  }
  return top
}

function pct(value: string | number, total: number): number {
  if (typeof value === "string" && value.includes("%"))
    return (parseFloat(value) / 100) * total
  return parseFloat(value as string)
}

function clamp01(v: number) {
  return v < 0 ? 0 : v > 1 ? 1 : v
}

// ── sub-component ─────────────────────────────────────────────────────────────

export const ScrollStackItem = ({
  children,
  itemClassName = "",
}: {
  children: React.ReactNode
  itemClassName?: string
}) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
)

// ── main component ────────────────────────────────────────────────────────────

interface ScrollStackProps {
  children: React.ReactNode
  className?: string
  itemDistance?: number
  itemScale?: number
  itemStackDistance?: number
  stackPosition?: string
  scaleEndPosition?: string
  baseScale?: number
  scaleDuration?: number
  rotationAmount?: number
  blurAmount?: number
  useWindowScroll?: boolean
  onStackComplete?: () => void
}

const ScrollStack = ({
  children,
  className = "",
  itemDistance     = 100,
  itemScale        = 0.03,
  itemStackDistance = 30,
  stackPosition    = "20%",
  scaleEndPosition = "10%",
  baseScale        = 0.85,
  rotationAmount   = 0,
  blurAmount       = 0,
  useWindowScroll  = false,
  onStackComplete,
}: ScrollStackProps) => {
  const wrapRef       = useRef<HTMLDivElement>(null)
  const rafRef        = useRef<number | null>(null)
  const completedRef  = useRef(false)
  // cached absolute tops — set once at mount, never read getBCR after transforms run
  const cardTopsRef   = useRef<number[]>([])
  const endTopRef     = useRef(0)

  const tick = useCallback(() => {
    const cards = wrapRef.current?.querySelectorAll<HTMLElement>(".scroll-stack-card")
    if (!cards?.length) return

    const scrollY  = useWindowScroll ? window.scrollY : (wrapRef.current?.scrollTop ?? 0)
    const vpH      = useWindowScroll ? window.innerHeight : (wrapRef.current?.clientHeight ?? 0)
    const stackPx  = pct(stackPosition, vpH)
    const scalePx  = pct(scaleEndPosition, vpH)
    const endTop   = endTopRef.current
    const pinEnd   = endTop - vpH / 2

    cards.forEach((card, i) => {
      const cardTop    = cardTopsRef.current[i] ?? 0
      const pinStart   = cardTop - stackPx - itemStackDistance * i
      const trigEnd    = cardTop - scalePx

      // scale
      const scaleProgress = clamp01((scrollY - pinStart) / Math.max(1, trigEnd - pinStart))
      const targetScale   = baseScale + i * itemScale
      const scale         = 1 - scaleProgress * (1 - targetScale)

      // translateY — pin card at stackPx from top
      let ty = 0
      if (scrollY >= pinStart && scrollY <= pinEnd) {
        ty = scrollY - cardTop + stackPx + itemStackDistance * i
      } else if (scrollY > pinEnd) {
        ty = pinEnd - cardTop + stackPx + itemStackDistance * i
      }

      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0

      let blur = 0
      if (blurAmount) {
        // find the topmost pinned card index
        let topIdx = 0
        cards.forEach((c, j) => {
          const jTop   = cardTopsRef.current[j] ?? 0
          const jStart = jTop - stackPx - itemStackDistance * j
          if (scrollY >= jStart) topIdx = j
        })
        if (i < topIdx) blur = (topIdx - i) * blurAmount
      }

      card.style.transform = `translate3d(0,${ty}px,0) scale(${scale}) rotate(${rotation}deg)`
      card.style.filter    = blur > 0 ? `blur(${blur}px)` : ""

      // onStackComplete callback
      if (i === cards.length - 1) {
        const inView = scrollY >= pinStart && scrollY <= pinEnd
        if (inView && !completedRef.current) {
          completedRef.current = true
          onStackComplete?.()
        } else if (!inView) {
          completedRef.current = false
        }
      }
    })
  }, [
    useWindowScroll, stackPosition, scaleEndPosition,
    itemStackDistance, baseScale, itemScale,
    rotationAmount, blurAmount, onStackComplete,
  ])

  useLayoutEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    const cards = Array.from(wrap.querySelectorAll<HTMLElement>(".scroll-stack-card"))
    if (!cards.length) return

    // Apply spacing & GPU hints BEFORE caching offsets
    cards.forEach((card, i) => {
      if (i < cards.length - 1) card.style.marginBottom = `${itemDistance}px`
      card.style.transformOrigin   = "top center"
      card.style.willChange        = "transform, filter"
      card.style.backfaceVisibility = "hidden"
    })

    // Cache absolute positions — must happen AFTER layout, BEFORE any transforms
    cardTopsRef.current = cards.map(getAbsoluteTop)
    const endEl = wrap.querySelector<HTMLElement>(".scroll-stack-end")
    endTopRef.current = endEl ? getAbsoluteTop(endEl) : 0

    // RAF loop — reads window.scrollY every frame, no jank
    const loop = () => {
      tick()
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)

    // Re-cache on resize (layout changes)
    const onResize = () => {
      cardTopsRef.current = cards.map(getAbsoluteTop)
      endTopRef.current = endEl ? getAbsoluteTop(endEl) : 0
    }
    window.addEventListener("resize", onResize)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener("resize", onResize)
      completedRef.current = false
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemDistance, tick])

  return (
    <div
      ref={wrapRef}
      data-window-scroll={useWindowScroll ? "true" : "false"}
      className={`scroll-stack-scroller ${className}`.trim()}
    >
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  )
}

export default ScrollStack
