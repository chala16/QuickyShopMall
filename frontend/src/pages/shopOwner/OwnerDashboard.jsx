import React from "react";
import { Button, Card } from "flowbite-react";
import { Link } from "react-router-dom";
import AddItem from "../../images/addItem.jpg";
import UpdateItem from "../../images/updateItem.jpg";
import DeleteItem from "../../images/DeleteItem.jpg";
import ViewItem from "../../images/ViewItem.jpg";
import management from "../../images/management.jpg";
import bg from "../../images/viewAdminBG.jpg";
import Navbar from "../../components/home/Navbar/Navbar";

const OwnerDashboard = () => {
  const admindashbord = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
  };

  const classgrid = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    marginTop: "40px",
    gridColumnGap: "20px",
    marginLeft: "10px",
    marginRight: "10px",
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        paddingBottom:"20px"
      }}
    >
      <Navbar />
      <div>
        {/*1st row*/}
        <div>
          <div style={classgrid}>
            <Card
              style={{
                backgroundImage: `url(${management})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            >
              <div style={admindashbord}>
                <div>
                  <img
                    style={{
                      height: `250px`,
                      borderRadius: "20px",
                    }}
                    src={AddItem}
                    alt="Employee Management"
                  />
                </div>
                <div style={{ marginLeft: "75px" }}>
                  <h5
                    className="text-3xl font-bold tracking-tight text-blue-600 dark:text-white"
                    style={{ marginBottom: `20px` }}
                  >
                    Add Item
                  </h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    Add your items.
                  </p>
                  <div className="mt-8">
                    <Link to={`/shopOwner/dashboard/add-item`}>
                      <button className="h-8 text-lg font-bold w-44 bg-sidebar-orange rounded-xl">
                        Add item
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>

            <Card
              style={{
                backgroundImage: `url(${management})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            >
              <div style={admindashbord}>
                <div>
                  <img
                    style={{
                      height: `250px`,
                      borderRadius: "20px",
                    }}
                    src={UpdateItem}
                    alt="Rental Management"
                  />
                </div>
                <div style={{ marginLeft: "75px" }}>
                  <h5
                    className="text-3xl font-bold tracking-tight text-blue-600 dark:text-white"
                    style={{ marginBottom: `20px` }}
                  >
                    Update Item
                  </h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    Update your item.
                  </p>
                  <div className="mt-8">
                    <Link to={`/admin/rental/dashboard`}>
                    <button className="h-8 text-lg font-bold w-44 bg-sidebar-orange rounded-xl">
                        Update item
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          {/* Finance Management */}
          <div>
            <div style={classgrid}>
              <Card
                style={{
                  backgroundImage: `url(${management})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              >
                <div style={admindashbord}>
                  <div>
                    <img
                      style={{
                        height: "250px",
                        borderRadius: "20px",
                      }}
                      src={DeleteItem}
                      alt="Finance Management"
                    />
                  </div>
                  <div style={{ marginLeft: "75px" }}>
                    <h5
                      className="text-3xl font-bold tracking-tight text-blue-600 dark:text-white"
                      style={{ marginBottom: `20px` }}
                    >
                      Delete Item
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                      Delete your items.
                    </p>
                    <div className="mt-8">
                      <Link to={`/shopOwner/dashboard/delete-items`}>
                      <button className="h-8 text-lg font-bold w-44 bg-sidebar-orange rounded-xl">
                        Delete item
                      </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>

              <Card
                style={{
                  backgroundImage: `url(${management})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              >
                <div style={admindashbord}>
                  <div>
                    <img
                      style={{
                        height: `250px`,
                        borderRadius: "20px",
                      }}
                      src={ViewItem}
                      alt="Feedback and Review Management"
                    />
                  </div>
                  <div style={{ marginLeft: "75px" }}>
                    <h5
                      className="text-3xl font-bold tracking-tight text-blue-600 dark:text-white"
                      style={{ marginBottom: `20px` }}
                    >
                      View Items
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                      View your items.
                    </p>
                    <div className="mt-8">
                      <Link to={`/shopOwner/dashboard/view-items`}>
                      <button className="h-8 text-lg font-bold w-44 bg-sidebar-orange rounded-xl">
                        View item
                      </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
