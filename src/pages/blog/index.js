import './blog.css'
import { parseCsv, parseRow } from '../../util/csv-parser'
import {
  GOOGLE_DRIVE_IMG,
  GOOGLE_DRIVE_CSV
} from '../../constants/links'
import {
  CONTENT_COLUMNS,
  TEXT_COLUMN,
  CONTENT_IMG_COLUMN
} from '../../constants/blog'

const Blog = {
  template: require('./blog.html').default,
  props: [
    'id',
    'img',
    'title',
    'intro',
    'date'
  ],
  data() {
    return {
      content: []
    }
  },
  methods: {
    fetchBlog() {
      fetch(GOOGLE_DRIVE_CSV+this.id)
        .then(res => parseCsv(res))
        .then(content => this.content = content)
    }
  },
  created() {
    this.fetchBlog()
  },
  computed: {
    parsedContent() {
      return this.content.map(row => {
        const parsedRow = parseRow(row, CONTENT_COLUMNS)
        const imageId   = parsedRow[CONTENT_IMG_COLUMN].replace(/^"|"$/g, '')
        return {
          text: parsedRow[TEXT_COLUMN].replace(/^"|"$/g, ''),
          img: imageId ? GOOGLE_DRIVE_IMG+imageId : null
        }
      })
    }
  }
}

export default Blog
