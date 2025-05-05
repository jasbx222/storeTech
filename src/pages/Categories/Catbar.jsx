import "./Department.css";
import img from "../../assets/department/department-1.png";
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
];

function Department() {
  return (
    <div className="department-container">
      <div className="container">
        <div className="categories-grid">
          {categories.slice(0, 4).map((category) => (
            <a key={category.id} href={category.url} className="category-item">
              <div className="category-image-container">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="category-image"
                />
              </div>
              <span className="category-name">{category.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Department;
