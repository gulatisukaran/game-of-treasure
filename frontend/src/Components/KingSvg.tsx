import { SVGProps } from "react"
import { JSX } from "react/jsx-runtime"

const KingSvg = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fill="gold" d="m20 30 30-20 30 20-10 10-20-15-20 15Z" />
      <circle cx={50} cy={60} r={25} fill="#FFE0B2" />
      <circle cx={40} cy={55} r={3} fill="#4E342E" />
      <circle cx={60} cy={55} r={3} fill="#4E342E" />
      <path fill="#4E342E" d="m50 60 3 5h-6Z" />
      <path fill="none" stroke="#4E342E" strokeWidth={2} d="M40 70q10 5 20 0" />
      <path fill="#8D6E63" d="M30 65q20 25 40 0" />
    </svg>
  )
  export default KingSvg