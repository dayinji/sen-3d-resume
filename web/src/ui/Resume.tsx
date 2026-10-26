import { motion } from 'framer-motion'
import { ZooopLogo } from './ZooopLogo'
import { SOCIAL_ICONS } from './SocialIcons'
import { FOCUS_POINTS } from '../data/focusPoints'
import { dirOf, type Lang } from '../i18n'

// 履历数据（按语言）。
interface ResumeGroup {
  heading?: string
  logo?: string
  logoImg?: string
  sub?: string
  link?: string
  items?: string[]
  links?: { id: string; label: string; href: string }[]
}
interface ResumeEntry {
  period: string
  place: string
  role?: string
  logo?: { src: string; alt: string }
  points?: string[]
  groups?: ResumeGroup[]
}
const RESUME: Record<Lang, { title: string; entries: ResumeEntry[] }> = {
  ar: {
    title: 'رحلتي في عالم التقنية',
    entries: [
      {
        period: '01 — 2017',
        place: 'البداية',
        points: [
          'بدأت رحلتي مع أول سطر برمجي، مدفوعًا بالفضول والرغبة في فهم كيفية عمل البرامج والأنظمة. ومع الوقت، تحوّل هذا الفضول إلى شغف مستمر بتطوير البرمجيات وبناء الحلول التقنية.',
        ],
      },
      {
        period: '02',
        place: 'تطوير الويب',
        points: [
          'أطوّر مواقع وتطبيقات ويب تجمع بين التصميم الأنيق والأداء السريع والتوافق مع مختلف الأجهزة، من واجهات المستخدم إلى الخوادم وقواعد البيانات، مع الاهتمام بالأمان منذ المراحل الأولى للتطوير.',
        ],
      },
      {
        period: '03',
        place: 'بوتات تيليغرام',
        points: [
          'أحوّل المهام المتكررة إلى عمليات مؤتمتة من خلال تطوير بوتات تيليغرام ذكية وعملية، تشمل الردود التلقائية، وإدارة المجموعات والقنوات، وتنظيم الطلبات، والتكامل مع قواعد البيانات والواجهات البرمجية.',
        ],
      },
      {
        period: '04',
        place: 'الأمن السيبراني',
        points: [
          'أهتم بفهم الأنظمة من منظور أمني، واختبار تطبيقات الويب لاكتشاف الثغرات ضمن نطاق مصرح به، وتحليل المشكلات الأمنية، وإعداد تقارير واضحة تتضمن النتائج والتوصيات المناسبة لمعالجتها.',
        ],
      },
      {
        // glb 只有 5 个时间轴锚点：「مشاريع المبرمجين」与「اليوم」合为最后一条
        period: '05 — 06',
        place: 'مشاريع المبرمجين',
        points: [
          'أؤمن بأن الأفكار التقنية تستحق فرصة لتصبح مشاريع حقيقية. لذلك أهتم بتطوير مشاريع المبرمجين، والمساهمة في تحسين الشيفرات والميزات، وتطوير الأنظمة القائمة، وتحويل التصورات الأولية إلى تطبيقات عملية قابلة للتطوير.',
          'سواء كان المشروع في بدايته أو يحتاج إلى إعادة تنظيم وتطوير، فإن الهدف هو الوصول إلى نتيجة عملية تجمع بين جودة التنفيذ وسهولة الاستخدام وقابلية التوسع.',
        ],
        groups: [
          {
            heading: 'اليوم',
            items: [
              'أواصل العمل على تطوير الويب وبوتات تيليغرام، واستكشاف مجالات الأمن السيبراني واختبار الاختراق، إلى جانب تطوير المشاريع البرمجية ومواصلة التعلم واكتساب الخبرات الجديدة.',
            ],
          },
        ],
      },
    ],
  },
}

// 履历条目依次对应 glb 里的聚焦锚点（相机停靠点），顺序须与 entries 一致。
// 名单是唯一真源，见 data/focusPoints.ts（Scene.tsx 也从那里取）。
const POINT_ORDER = FOCUS_POINTS

const EASE = [0.22, 1, 0.36, 1]
const containerV = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
}
const itemV = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
}

function Group({ group }: { group: ResumeGroup }) {
  const heading =
    group.logo === 'zooop' ? (
      <a
        className="zooop-logo-link"
        href={group.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="ZOOOP"
      >
        <ZooopLogo className="zooop-logo" animated />
      </a>
    ) : group.link ? (
      <a className="about-link" href={group.link} target="_blank" rel="noopener noreferrer">
        {group.heading}
      </a>
    ) : (
      <span>{group.heading}</span>
    )

  return (
    <motion.div className="tl-group" variants={itemV}>
      <div className="tl-group-head">
        {group.logoImg && (
          <span className="tl-group-logo">
            <img src={group.logoImg} alt={group.heading || ''} loading="lazy" />
          </span>
        )}
        {heading}
        {group.sub && <span className="tl-group-sub">{group.sub}</span>}
      </div>
      {group.items && (
        <ul className="tl-points">
          {group.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      )}
      {group.links && (
        <div className="tl-logos">
          {group.links.map((l) => {
            const Icon = SOCIAL_ICONS[l.id as keyof typeof SOCIAL_ICONS]
            return (
              <a
                key={l.id}
                className="tl-logo"
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={l.label}
                title={l.label}
              >
                <Icon />
              </a>
            )
          })}
        </div>
      )}
    </motion.div>
  )
}

function Entry({ entry, index }: { entry: ResumeEntry; index: number }) {
  return (
    <motion.div
      className="tl-entry"
      data-point={POINT_ORDER[index]}
      variants={containerV}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
    >
      <motion.span className="tl-dot" variants={itemV} aria-hidden="true" />
      {/* tl-body 包住文字内容（点保持在外做时间轴标记）：移动端可给它加卡片衬底，
          且它紧贴内容高度，不含 tl-entry 用于排布的大 padding。
          用普通 div（非 motion）：framer 变体经 React context 穿透它，叶子元素仍是
          tl-entry 的直接 stagger 子级，入场动画与包裹前完全一致。 */}
      <div className="tl-body">
        <motion.div className="tl-period" variants={itemV}>
          {entry.period}
        </motion.div>
        <motion.div className="tl-head" variants={itemV}>
          {entry.logo && (
            <span className="tl-logo-chip">
              <img src={entry.logo.src} alt={entry.logo.alt} loading="lazy" />
            </span>
          )}
          <h3 className="tl-place">{entry.place}</h3>
        </motion.div>
        {entry.role && (
          <motion.div className="tl-role" variants={itemV}>
            {entry.role}
          </motion.div>
        )}
        {entry.points && (
          <motion.ul className="tl-points" variants={itemV}>
            {entry.points.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </motion.ul>
        )}
        {entry.groups && entry.groups.map((g, i) => <Group key={i} group={g} />)}
      </div>
    </motion.div>
  )
}

export default function Resume({ lang }: { lang: Lang }) {
  const data = RESUME[lang]
  return (
    <section className="resume" lang={lang} dir={dirOf(lang)}>
      <motion.h2
        className="resume-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        {data.title}
      </motion.h2>
      <div className="timeline">
        {data.entries.map((e, i) => (
          <Entry key={i} entry={e} index={i} />
        ))}
      </div>
    </section>
  )
}
