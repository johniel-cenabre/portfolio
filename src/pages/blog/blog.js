import './blog.css'
import { GOOGLE_DRIVE_IMG, GOOGLE_DRIVE_CSV, GOOGLE_DRIVE_BLOG_CSV } from '../../constants/links'

const BLOG_COLUMNS = 6
const DATE_COLUMN = 0
const TITLE_COLUMN = 1
const INTRO_COLUMN = 2
const IMG_COLUMN = 3
const CONTENT_COLUMN = 4
const FEATURED_COLUMN = 5
const CONTENT_COLUMNS = 2
const TEXT_COLUMN = 0
const CONTENT_IMG_COLUMN = 1

export const blog = 

[
  {
    title: 'How I built my Portfolio',
    intro: `"It wasn't hard to find my framework of choice."`,
    img: GOOGLE_DRIVE_IMG+'1dM-RjjOAQMpkYL8T3sAd23zVcm9WTd4N',
    content: [
      {
        text: `Let me start by saying, "It wasn't hard to find my framework of choice". For this, I used Vue... Yes, VueJS but not with the CLI, only via their public CDN.`,
        img: GOOGLE_DRIVE_IMG+'1dM-RjjOAQMpkYL8T3sAd23zVcm9WTd4N'
      }
    ],
    featured: true
  }
]

const Blog = {
  template: require('./blog.html').default,
  props: [
    'index'
  ],
  data() {
    return {
      blogList: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      fetch(GOOGLE_DRIVE_BLOG_CSV)
        .then(res => parseCsv(res))
        .then(rows => {
          rows.forEach((row, index) => {
            const parsedRow = parseRow(row, BLOG_COLUMNS)
            const contentId = parsedRow[CONTENT_COLUMN].replace(/^"|"$/g, '')
            fetch(GOOGLE_DRIVE_CSV+contentId)
              .then(res => parseCsv(res))
              .then(content => {
                if (!this.blogList[index]) {
                  this.blogList[index] = {
                    date: parsedRow[DATE_COLUMN].replace(/^"|"$/g, ''),
                    title: parsedRow[TITLE_COLUMN].replace(/^"|"$/g, ''),
                    intro: parsedRow[INTRO_COLUMN].replace(/^"|"$/g, ''),
                    img: GOOGLE_DRIVE_IMG+parsedRow[IMG_COLUMN].replace(/^"|"$/g, ''),
                    content: content.map(row => {
                      const parsedRow = parseRow(row, CONTENT_COLUMNS)
                      return {
                        text: parsedRow[TEXT_COLUMN].replace(/^"|"$/g, ''),
                        img: GOOGLE_DRIVE_IMG+parsedRow[CONTENT_IMG_COLUMN].replace(/^"|"$/g, '')
                      }
                    }),
                    featured: parsedRow[FEATURED_COLUMN].replace(/^"|"$/g, '')
                  }
                }
              })
          })
        })
    }
  },
  computed: {
    blog: function () {
      console.log(this.blogList)
      return this.blogList[this.index]
    }
  }
}

async function parseCsv(res, start = 1) {
  const text = await res.text()
  const rows = text.split("\n").slice(start, text.length - start)
  
  return rows
}

function parseRow(row, columns) {
  return row.split(',').slice(0, columns)
}

export default Blog
