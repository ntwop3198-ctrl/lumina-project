"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Gem } from "lucide-react"
import { motion } from "framer-motion"

const SPOTLIGHT = [
  {
    name: "오트리브",
    category: "클린 스킨케어",
    line: "출시 3주 만에 리뷰 200+",
    image:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "누아르 벨",
    category: "니치 프래그런스",
    line: "SNS 저장 수 4.8배↑",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "루미에르 랩",
    category: "에어리스 앰플",
    line: "상세 이탈율 −31%",
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop",
  },
]

export function SocialProofSection() {
  return (
    <section id="stories" className="relative py-20 lg:py-28 bg-cream border-y border-rose-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-14">
          <div>
            <p className="text-gold text-xs tracking-[0.35em] uppercase mb-3 flex items-center gap-2">
              <Gem className="w-4 h-4" />
              Lumina Stories
            </p>
            <h2 className="max-w-xl font-serif text-3xl font-light leading-[1.28] tracking-[-0.02em] text-charcoal sm:text-4xl sm:leading-[1.3] lg:text-[2.75rem] lg:leading-[1.26] lg:tracking-[-0.025em]">
              성과로 증명한
              <span className="mt-1 block text-gradient-gold">스포트라이트 브랜드</span>
            </h2>
            <p className="mt-5 text-charcoal/60 text-sm leading-[1.72] tracking-[-0.01em] sm:mt-6 sm:text-base sm:leading-[1.75] max-w-lg">
              “나도 루미나로 저런 보석 같은 브랜드를 만들고 싶다”는 마음이 드는 순간을 위해, 실제 성과를 한곳에 모았습니다.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 self-start lg:self-auto text-sm font-medium text-rose-gold-dark hover:text-charcoal transition-colors group"
          >
            전체 사례 보기
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {SPOTLIGHT.map((item, i) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group rounded-2xl bg-white border border-cream-dark/60 overflow-hidden shadow-sm hover:shadow-xl hover:border-gold/25 transition-all duration-500"
            >
              <div className="relative aspect-[4/3] bg-cream/50 overflow-hidden">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
                <p className="absolute bottom-4 left-4 right-4 text-white text-sm font-medium drop-shadow-md">
                  {item.line}
                </p>
              </div>
              <div className="p-5">
                <p className="text-[11px] tracking-wider text-charcoal/45 uppercase mb-1">{item.category}</p>
                <h3 className="font-serif text-lg text-charcoal">{item.name}</h3>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
