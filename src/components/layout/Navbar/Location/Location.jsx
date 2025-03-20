import React, { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBranches, setSelectedArea, setBranchId } from "../../../../features/locations/locationSlice";
import { Dialog } from "@headlessui/react";
import LocationDetails from "./LocationDetails";

const Location = forwardRef((props, ref) =>{
  
  const [isOpen, setIsOpen] = useState(props.autoOpen || false);
  const dispatch = useDispatch();
  const { branches, isLoading, isError, selectedArea } = useSelector((state) => state.location);

  useEffect(() => {
    console.log("branches",branches)
    dispatch(fetchBranches());

    if (!selectedArea) {
      const storedArea = localStorage.getItem("selectedArea");
      const storedBranchId = localStorage.getItem("branchId");

      if (storedArea && storedBranchId) {
        dispatch(setSelectedArea(storedArea));
        dispatch(setBranchId(storedBranchId));
      }
    }
  }, [dispatch, selectedArea]);

    // Add this to expose the open method
    useImperativeHandle(ref, () => ({
      openDialog: () => setIsOpen(true)
    }));

  const handleLocation = (childValue) => {
    setIsOpen(childValue);
    console.log("clicked")
  };

  return (
    <div>
      <div onClick={() => setIsOpen(true)} className="cursor-pointer ">
        {isLoading && <p>Loading...</p>}
        {isError && <p className="pb-1">Something wrong!</p>}
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
          <p>{selectedArea ? selectedArea : "No area select"}</p>
        )}
      </div>
      <Dialog
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        className="fixed w-full min-h-screen inset-0 z-50 items-center"
      >
        <LocationDetails sendDataToParent={handleLocation} branches={branches.data} />
      </Dialog>
    </div>
  );
})

export default Location;
