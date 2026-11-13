#let lang = sys.inputs.at("lang", default: "ko")
#let font = sys.inputs.at("font", default: "NanumGothic")
#let resume = json("generated/resume-" + lang + ".json")
#let muted = rgb("#666666")
#let rule = rgb("#dddddd")

#set document(title: resume.name + " - Resume", author: resume.name)

#set page(
  paper: "a4",
  margin: (x: 19mm, y: 11mm),
  header: context {
    if counter(page).get().first() > 1 {
      align(right)[#text(size: 7pt, fill: muted)[#resume.name, #resume.title]]
    }
  },
  footer: context {
    align(right)[#text(size: 7pt, fill: muted)[#counter(page).display()]]
  },
)
#set text(font: font, size: 9pt)
#set par(justify: false, leading: 0.48em)
#set heading(numbering: none)

#let result-text(value) = {
  let sentence = if lang == "ko" {
    "동시 저장에서 메모가 덮어쓰이지 않도록 프론트엔드와 백엔드의 조건부 저장 계약을 맞췄습니다. 2건과 10건 동시 저장을 각각 30회 재현한 실험에서 성공 응답 뒤 유실된 메모는 300/360건에서 0/360건으로 줄었습니다."
  } else {
    "Aligned the frontend and backend conditional-save contract for concurrent memo updates. In a reproduction with 2 and 10 concurrent saves, each repeated 30 times, memos missing after successful responses fell from 300/360 to 0/360."
  }
  let result = if lang == "ko" { "300/360건에서 0/360건" } else { "300/360 to 0/360" }
  if value == sentence {
    let parts = value.split(result)
    [#parts.at(0)#strong(result)#parts.at(1)]
  } else { value }
}

#let entry(item) = block(breakable: false)[
  #grid(
    columns: (28%, 1fr),
    gutter: 10pt,
    [
      #text(weight: "bold", size: 9.4pt)[#item.title]
      #if item.subtitle != "" [#linebreak() #text(size: 8pt, fill: muted)[#item.subtitle]]
      #if item.caption != "" [#linebreak() #text(size: 7.8pt, fill: muted)[#item.caption]]
      #if item.link != "" [#linebreak() #link(item.link)[#text(size: 7.8pt, fill: rgb("#2a6f9e"))[#item.link_text]]]
      #for extra in item.additional_links [#linebreak() #link(extra.url)[#text(size: 7.8pt, fill: rgb("#2a6f9e"))[#extra.title]]]
    ],
    [
      #for bullet in item.bullets [
        #text(size: 8.7pt)[• #result-text(bullet)]
        #linebreak()
      ]
    ],
  )
  #v(1.5pt)
]

#text(size: 20pt, weight: "bold")[#resume.name]
#linebreak()
#text(size: 10pt, fill: muted)[#resume.title]
#v(4pt)
#line(length: 100%, stroke: 0.8pt + rule)
#v(4pt)
#text(size: 8pt, fill: muted)[#link("mailto:" + resume.email)[#resume.email], #link(resume.github)[#resume.github]]

#v(4pt)
#text(size: 8.7pt)[#resume.about]

#for section in resume.sections [
  #if section.entries.len() > 0 [
    #block(breakable: false)[
      #v(5pt)
      #text(size: 12pt, weight: "bold")[#section.title]
      #v(1pt)
      #line(length: 100%, stroke: 0.45pt + rule)
      #v(3pt)
      #entry(section.entries.at(0))
    ]
    #for item in section.entries.slice(1) [#entry(item)]
  ]
]
