import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBranches } from "../../../../features/locations/locationSlice";
import { Dialog } from "@headlessui/react";
import LocationDetails from "./LocationDetails";

const Location = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { branches, isLoading, isError } = useSelector((state) => state.location); 

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  const handleLocation = (childValue) =>{
    setIsOpen(childValue)
  }

  const { selectedArea } = useSelector((state) => state.location)
  console.log("selectedArea",selectedArea)

  return (
    <div>
      <div onClick={() => setIsOpen(true)} className="cursor-pointer ">
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error fetching locations</p>}
      {branches.length > 0 ? (
        branches.map((branch, index) => (
          <button key={index} className="mr-2 text-capitalize small-device-branch branch-change">
            <span className="text text-textColor">
              <i className="fas fa-map-marker-alt mr-2" style={{ color: "#41b883" }}></i>
              {branch.name}
            </span>
          </button>
        ))
      ) : (
        <p>{selectedArea ? selectedArea : "No area selected"}</p>
      )}
    </div>
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed w-full min-h-screen inset-0 z-50 items-center">
      <LocationDetails sendDataToParent={handleLocation} branches={branches.data} />
    </Dialog>
    </div>
  );
};

export default Location;
