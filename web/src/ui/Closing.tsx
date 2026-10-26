import { motion } from 'framer-motion'
import { dirOf, type Lang } from '../i18n'

// 作品区之后的收尾：من أنا / رؤيتي / لنعمل معًا + 联系方式 + 页脚
// 联系方式 href 留空 = 尚未填写，只显示占位文字，不渲染成链接
interface Contact {
  label: string
  value: string
  href: string
}

interface ClosingCopy {
  blocks: { title: string; paragraphs: string[] }[]
  cta: { title: string; paragraphs: string[]; closing: string }
  contacts: Contact[]
  pending: string
  footer: string[]
}

const CLOSING: Record<Lang, ClosingCopy> = {
  ar: {
    blocks: [
      {
        title: 'من أنا؟',
        paragraphs: [
          'أنا أبو الحسن عبدالهادي، مبرمج عراقي من محافظة ميسان، وخريج تحليلات مرضية، بدأت رحلتي في عالم البرمجة عام 2017، ومنذ ذلك الحين وأنا أتعلم وأطوّر مهاراتي وأسعى إلى تحويل الأفكار الطموحة إلى حلول تقنية عملية.',
          'أجمع بين شغفي بتطوير البرمجيات واهتمامي بالأمن السيبراني، فأعمل على بناء مواقع وتطبيقات ويب، وتطوير بوتات تيليغرام، والمساهمة في تطوير مشاريع المبرمجين وتحسينها.',
          'أنظر إلى كل نظام من زاويتين: كيف أبنيه بأفضل صورة ممكنة، وكيف أختبره لاكتشاف نقاط ضعفه وتعزيز حمايته.',
          'بالنسبة لي، البرمجة ليست مجرد مهنة، بل مساحة للإبداع والتجربة وصناعة أشياء لم تكن موجودة من قبل.',
        ],
      },
      {
        title: 'رؤيتي',
        paragraphs: [
          'أطمح إلى بناء حلول تقنية لا تكتفي بأداء وظيفتها، بل تتميز بالجودة والموثوقية والأمان.',
          'أؤمن بأن المبرمج الجيد لا يتوقف عند كتابة شيفرة تعمل؛ بل يسعى إلى فهم المشكلة من جذورها، واختيار الحل الأنسب، وبناء نظام يمكن الاعتماد عليه وتطويره مستقبلًا.',
          'كل فكرة تستحق أن تُبنى بإتقان، وكل نظام يستحق أن يكون أكثر أمانًا.',
        ],
      },
    ],
    cta: {
      title: 'لنعمل معًا',
      paragraphs: [
        'لديك فكرة مشروع ويب؟ تحتاج إلى بوت تيليغرام مخصص؟ تريد تطوير مشروعك البرمجي أو فحص أمان تطبيقك؟',
        'يسعدني التعرّف على فكرتك ومناقشة كيفية تحويلها إلى حل تقني عملي.',
      ],
      closing: 'أخبرني بفكرتك، ولنبدأ من أول سطر.',
    },
    contacts: [
      { label: 'تيليغرام', value: '', href: '' },
      { label: 'البريد الإلكتروني', value: '', href: '' },
      { label: 'GitHub', value: 'github.com/aliopo3h-byte', href: 'https://github.com/aliopo3h-byte' },
    ],
    pending: 'يُضاف قريبًا',
    footer: ['ميسان، العراق', 'لا تحليلات تتبّع، ولا ملفات تعريف ارتباط.'],
  },
}

const EASE = [0.22, 1, 0.36, 1]
const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-10% 0px' },
  transition: { duration: 0.7, ease: EASE },
}

export default function Closing({ lang }: { lang: Lang }) {
  const c = CLOSING[lang]
  return (
    <section className="closing" lang={lang} dir={dirOf(lang)}>
      <div className="closing-inner">
        {c.blocks.map((b) => (
          <motion.div key={b.title} className="closing-block" {...reveal}>
            <h2 className="closing-title">{b.title}</h2>
            {b.paragraphs.map((p, i) => (
              <p key={i} className="closing-p">
                {p}
              </p>
            ))}
          </motion.div>
        ))}

        <motion.div className="closing-block closing-cta" {...reveal}>
          <h2 className="closing-title">{c.cta.title}</h2>
          {c.cta.paragraphs.map((p, i) => (
            <p key={i} className="closing-p">
              {p}
            </p>
          ))}
          <p className="closing-p closing-accent">{c.cta.closing}</p>
          <ul className="closing-contacts">
            {c.contacts.map((ct) => (
              <li key={ct.label}>
                <span className="closing-contact-label">{ct.label}</span>
                {ct.href ? (
                  <a href={ct.href} target="_blank" rel="noopener noreferrer" dir="ltr">
                    {ct.value}
                  </a>
                ) : (
                  <span className="closing-contact-pending">{c.pending}</span>
                )}
              </li>
            ))}
          </ul>
        </motion.div>

        <footer className="closing-footer">
          {c.footer.map((f, i) => (
            <span key={i}>{f}</span>
          ))}
        </footer>
      </div>
    </section>
  )
}
