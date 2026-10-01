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
      align(right)[#text(size: 7pt, fill: muted)[#resume.name · #resume.title]]
    }
  },
  footer: context {
    align(right)[#text(size: 7pt, fill: muted)[#counter(page).display()]]
  },
)
#set text(font: font, size: 9pt)
#set par(justify: false, leading: 0.48em)
#set heading(numbering: none)

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
        #text(size: 8.7pt)[• #bullet]
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
#text(size: 8pt, fill: muted)[#link("mailto:" + resume.email)[#resume.email] · #link(resume.github)[#resume.github]]

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
