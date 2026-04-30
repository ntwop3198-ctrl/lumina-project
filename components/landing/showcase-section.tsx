"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const categories = [
  "ALL",
  "SKINCARE",
  "FRAGRANCE",
  "MAKEUP",
  "HAIRCARE",
  "ANTI-AGE",
  "LIP CARE",
];

const products = [
  {
    name: "세럼 루미에르",
    type: "스킨케어",
    category: "SKINCARE",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "오 드 퍼퓸 시그니처",
    type: "프래그런스",
    category: "FRAGRANCE",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "벨벳 파운데이션 쿠튀르",
    type: "메이크업",
    category: "MAKEUP",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "24K 브릴리언트 헤어 오일",
    type: "헤어케어",
    category: "HAIRCARE",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "캐비어 아이 크림 프리미에르",
    type: "안티에이징",
    category: "ANTI-AGE",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "비타 세럼 인텐시브",
    type: "스킨케어",
    category: "SKINCARE",
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=1000&auto=format&fit=crop",
  },
];

export function ShowcaseSection() {
  const [activeCategory, setActiveCategory] = useState("ALL");

  const filteredProducts =
    activeCategory === "ALL"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section id="showcase" className="relative bg-[#faf7f2] py-24 lg:py-36 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(201,162,39,0.06), transparent 50%)",
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14 lg:mb-20">
          <div>
            <p className="text-gold text-xs tracking-[0.45em] mb-4 uppercase">
              The world&apos;s most beautiful gallery
            </p>
            <h2 className="font-serif text-4xl lg:text-[3.25rem] text-charcoal leading-[1.12]">
              럭셔리 미학
              <br />
              <span className="italic text-gradient-gold">Showcase</span>
            </h2>
          </div>
          <p className="font-sans text-charcoal/65 max-w-md mt-6 lg:mt-0 text-sm lg:text-base lg:text-right leading-relaxed">
            조명·여백·질감까지 갤러리 편집처럼 다듬은 프레임입니다. 한 컷으로 브랜드의 가격대와 세계관이 읽힙니다.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2.5 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-4 md:px-5 py-2 rounded-full text-xs md:text-sm font-medium transition-all tracking-tight",
                activeCategory === category
                  ? "bg-gradient-gold text-black shadow-gold"
                  : "bg-white text-charcoal/70 hover:bg-cream-dark border border-cream-dark"
              )}
            >
              {
                {
                  ALL: "전체",
                  SKINCARE: "스킨케어",
                  FRAGRANCE: "프래그런스",
                  MAKEUP: "메이크업",
                  HAIRCARE: "헤어케어",
                  "ANTI-AGE": "안티에이징",
                  "LIP CARE": "립케어",
                }[category]
              }
            </button>
          ))}
        </div>

        {/* Editorial grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "group bg-white rounded-[1.35rem] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(201,162,39,0.12)] transition-all duration-500 border border-charcoal/[0.06] hover:border-gold/25",
                index === 1 && "lg:translate-y-8",
                index === 4 && "lg:-translate-y-6"
              )}
            >
              <div
                className={cn(
                  "relative bg-cream/40 overflow-hidden",
                  index % 3 === 0 ? "aspect-[4/5]" : "aspect-[4/3]"
                )}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-[1.045]"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  unoptimized
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1512207846876-bb54ef5056ca?q=80&w=1000&auto=format&fit=crop";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              <div className="px-6 py-5 lg:px-7 lg:py-6">
                <p className="font-sans text-charcoal/45 text-[11px] tracking-[0.2em] uppercase mb-1.5">
                  {product.type}
                </p>
                <h3 className="font-serif text-[1.15rem] lg:text-xl text-charcoal tracking-tight">
                  {product.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
