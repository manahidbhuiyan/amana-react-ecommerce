import React, { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBranches, setSelectedArea, setBranchId } from "../../../../features/locations/locationSlice";
import { Dialog } from "@headlessui/react";
import LocationDetails from "./LocationDetails";

const Location = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(props.autoOpen || false);
  const dispatch = useDispatch();
  const { branches, isLoading, isError, selectedArea } = useSelector((state) => state.location);

  useEffect(() => {
    dispatch(fetchBranches());

    if (!selectedArea) {
      const storedArea = localStorage.getItem("selectedArea");
      const storedBranchId = localStorage.getItem("branchId");

      if (storedArea && storedBranchId) {
        dispatch(setSelectedArea(storedArea));
        dispatch(setBranchId(storedBranchId));
      }
    }
  }, [selectedArea]);
  // }, [dispatch, selectedArea]);

  // Add this to expose the open method
  useImperativeHandle(ref, () => ({
    openDialog: () => setIsOpen(true),
  }));

  const handleLocation = (childValue) => {
    setIsOpen(childValue);
  };

  return (
    <div>
      <div onClick={() => setIsOpen(true)} className="cursor-pointer ">
        {isLoading && <p>Loading...</p>}
        {isError && <p className="pb-1">Something wrong!</p>}

        <p className="text-themeColor text-font-17 flex items-center">
          {selectedArea ? (
            <>
              <i className="fas fa-map-marker-alt mr-1 text-[15px] mt-[-2px] "></i>
              {selectedArea
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </>
          ) : (
            "No area selected"
          )}
        </p>

        {/* {branches.length > 0 ? (
          branches.map((branch, index) => (
            <button key={index} className="mr-2 text-capitalize small-device-branch branch-change">
              <span className="text text-themeColor ">
                <i className="fas fa-map-marker-alt mr-2 "></i>
                <i class="fa-solid fa-location-dot"></i>
                {branch.name}
              </span>
            </button>
          ))
        ) : (
          <p>{selectedArea ? selectedArea : "No area select"}</p>
        )} */}
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
});

export default Location;
