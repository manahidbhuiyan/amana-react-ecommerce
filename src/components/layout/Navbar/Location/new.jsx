import React, { useState, useEffect  } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setSelectedArea, setBranchId } from "../../../../features/locations/locationSlice";

const LocationDetails = ({ sendDataToParent, branches }) => {
  const dispatch = useDispatch();
  const { selectedArea, branchId } = useSelector((state) => state.location);

  // States
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [filteredAreas, setFilteredAreas] = useState([]);

   const [isOpen, setIsOpen] = useState(false);

// Extract unique districts & sort them
const uniqueDistricts = [...new Set(branches.map(branch => branch.district.name))].sort((a, b) => a.localeCompare(b));

// Filter area Based on selected district

useEffect(() => {
  if (selectedDistrict) {
    const areas = branches
      .filter(branch => branch.district.name === selectedDistrict)
      .flatMap(branch => branch.areas) 
      .sort((a, b) => a.name.localeCompare(b.name));

    setFilteredAreas(areas);
  } else {
    setFilteredAreas([]);
  }
}, [selectedDistrict, branches]);

const handleAreaSelect = (area, branchId) => {
  // Dispatch to Redux to set selected area and branchId
  dispatch(setSelectedArea(area));
  dispatch(setBranchId(branchId));
};


  return (
    <div className="bg-white rounded-lg p-6 shadow-2xl w-96 mx-auto mt-[30vh]">
      <h2 className="text-xl font-bold mb-4">Select Your Area</h2>
      <div className="space-y-3">

        {/* District Dropdown */}
        <select
          value={selectedDistrict}
          onChange={(e) => {
            setSelectedDistrict(e.target.value);
            setSelectedArea(""); // Reset area when district changes
          }}
          className="w-full p-2 border rounded-lg"
        >
          <option value="">Select District</option>
          {uniqueDistricts.map((district, index) => (
            <option key={index} value={district}>
              {district}
            </option>
          ))}
        </select>


        {/* Area Dropdown */}
        <select
          value={selectedArea}
          onChange={(e) => {
            const selectedArea = e.target.value;
            const branchId = branches.find(branch => branch.areas.some(area => area.name === selectedArea))?._id;
            handleAreaSelect(selectedArea, branchId);
          }}
          className="w-full p-2 border rounded-lg"
          disabled={!selectedDistrict}
        >
          <option value="">Select Area</option>
          {filteredAreas.map((area, idx) => (
            <option key={idx} value={area.name}>
              {area.name}
            </option>
          ))}
        </select>
      </div>

      {/* Close Button */}
      <div className="mt-4 flex justify-end space-x-4">
        <button
          onClick={() => {
            setIsOpen(false);
            sendDataToParent(isOpen);
          }}
          className="px-4 py-2 bg-buttonColor text-white rounded-lg"
        >
          Save
        </button>
        <button
          onClick={() => {
            setIsOpen(false);
            sendDataToParent(isOpen);
          }}
          className="px-4 py-2 bg-buttonColor text-white rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default LocationDetails;
