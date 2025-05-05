import React, { useState } from "react";
import useCategory from "../../hooks/useCategory";
import Skeleton from "react-loading-skeleton";
import "bootstrap/dist/css/bootstrap.min.css";

function DepartCircle() {
  const { categories, loading, error } = useCategory();
  const [showAll, setShowAll] = useState(false);

  const displayedCategories = showAll ? categories : categories.slice(0, 6);

  if (loading) {
    return (
      <div className="container">
        <div className="row">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="col-6 col-md-4 col-lg-2 mb-4 text-center"
            >
              <Skeleton circle={true} height={80} width={80} />
              <Skeleton width={60} style={{ marginTop: 10 }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <div className="row">
        {displayedCategories.map((category) => (
          <div
            key={category.id}
            className="col-6 col-md-4 col-lg-2 mb-4 text-center"
          >
            <a
              href={`/categories/${category.id}`}
              className="text-decoration-none text-dark"
            >
              <div
                className="rounded-circle border d-flex justify-content-center align-items-center mx-auto"
                style={{ width: 80, height: 80, overflow: "hidden" }}
              >
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="img-fluid"
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              </div>
              <div className="mt-2">{category.name}</div>
            </a>
          </div>
        ))}
      </div>

      {categories.length > 6 && (
        <div className="text-center mt-3">
          <button
            className="btn btn-outline-primary"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "عرض أقل" : "عرض المزيد"}
          </button>
        </div>
      )}
    </div>
  );
}

export default DepartCircle;
