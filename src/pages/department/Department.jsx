import "./Department.css"
import img from "../../assets/department/department-1.png"
import DepartCircle from "../Categories/DepartCircle"
import { Link } from "react-router-dom"
// You can replace these placeholder images with your actual images
const categories = [
  {
    id: 1,
    name: "السماعات",
    image: img, 
    url: "/category/headphones",
  },
  {
    id: 2,
    name: "هواتف",
    image: "/images/phones.png", // Replace with your actual image path
    url: "/category/phones",
  },
  {
    id: 3,
    name: "خواتم",
    image: "/images/jewelry.png", // Replace with your actual image path
    url: "/category/jewelry",
  },
  {
    id: 4,
    name: "الساعات",
    image: "/images/watches.png", // Replace with your actual image path
    url: "/category/watches",
  },
  {
    id: 5,
    name: "ديكورات",
    image: "/images/decorations.png", // Replace with your actual image path
    url: "/category/decorations",
  },
  {
    id: 6,
    name: "اجهزة",
    image: "/images/appliances.png", // Replace with your actual image path
    url: "/category/appliances",
  },
  {
    id: 7,
    name: "الملابس",
    image: "/images/clothing.png", // Replace with your actual image path
    url: "/category/clothing",
  },
]

function Department() {
  return (
    <div className="department-container">
    <div className="container">
    <div className="">
      <div className="department-header">
        <h2 className="department-title">وصلت للمكان اللي كلشي تلگاه بيه مريح!</h2>
       <p>مصمم لراحتك ومفصل حتى يلبي احتياجاتك، سواء جنت دتدور<br></br> شي مريح للبيت، للمكتب، للحديقة أو أي مساحة عندك.</p>
      </div>

      <div className="categories">
       <DepartCircle/>
      </div>
    </div>
    </div>
    </div>
  )
}

export default Department

