import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBranches } from "../../../../features/locations/locationSlice";
import { Dialog } from "@headlessui/react";
import LocationDetails from "./LocationDetails";

const Location = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { branches, isLoading, isError } = useSelector((state) => state.location); // ✅ FIXED

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  console.log("branches", branches);

  return (
    <div>
      <div onClick={() => setIsOpen(true)}>
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
        <p>No area found</p>
      )}
    </div>
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed w-full min-h-screen inset-0 z-50 items-center">
      <LocationDetails />
    </Dialog>
    </div>
  );
};

export default Location;
