"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const footerLinks = {
  platform: {
    title: "플랫폼",
    links: [
      { label: "AI 카피라이팅", href: "#" },
      { label: "비주얼 자동화", href: "#" },
      { label: "브랜드 분석", href: "#" },
      { label: "시장 인사이트", href: "#" },
    ],
  },
  solutions: {
    title: "솔루션",
    links: [
      { label: "럭셔리 브랜드", href: "#" },
      { label: "신생 코스메틱 브랜드", href: "#" },
      { label: "PB · OEM 브랜드", href: "#" },
      { label: "API 연동", href: "#" },
    ],
  },
  company: {
    title: "회사",
    links: [
      { label: "루미나 소개", href: "#" },
      { label: "성공 사례", href: "#" },
      { label: "채용 안내", href: "#" },
      { label: "미디어 키트", href: "#" },
    ],
  },
  legal: {
    title: "약관 및 정책",
    links: [
      { label: "개인정보처리방침", href: "#" },
      { label: "서비스 이용약관", href: "#" },
      { label: "쿠키 정책", href: "#" },
      { label: "GDPR 안내", href: "#" },
    ],
  },
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="bg-black py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="relative flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-gold rounded-sm flex items-center justify-center">
                <span className="text-black font-semibold text-lg">L</span>
              </div>
              <span className="hidden sm:inline-block font-sans text-xs sm:text-[13px] tracking-[0.28em] text-white uppercase">
                LUMINA
              </span>
              <span className="absolute -right-1 -top-1 hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_6px_rgba(212,175,55,0.9)]" />
            </Link>
            <p className="text-white/50 text-sm mb-6 max-w-xs">
              코스메틱 브랜드를 위해 설계된 AI 브랜딩 플랫폼 루미나. 평범한 제품을
              럭셔리 브랜드로 성장시키는 전략과 카피를 함께 만듭니다.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center hover:bg-gold/20 transition-colors group"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 text-white/50 group-hover:text-gold transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.values(footerLinks).map((section, index) => (
            <div key={index}>
              <h4 className="text-white/30 text-xs tracking-wider mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-white/60 text-sm hover:text-gold transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
            <p className="text-white/40 text-sm">
              © 2024 LUMINA AI. All rights reserved.
            </p>
            <p className="text-white/30 text-xs">
              데이터와 감성을 아우르는 K-Beauty AI 브랜딩 솔루션
            </p>
          </div>
          <Button
            className="bg-gradient-gold hover:bg-gradient-gold-hover text-black font-semibold px-5 py-2 text-sm shadow-gold"
            onClick={() => {
              const el = document.getElementById("upload");
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          >
            무료 분석 체험하기
          </Button>
        </div>
      </div>
    </footer>
  );
}
