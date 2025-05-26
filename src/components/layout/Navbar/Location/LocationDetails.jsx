import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedArea, setBranchId } from "../../../../features/locations/locationSlice";

const LocationDetails = ({ sendDataToParent, branches }) => {
  const dispatch = useDispatch();
  const { selectedArea, branchId } = useSelector((state) => state.location);

  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [filterAreas, setFilteredAreas] = useState([]);

  const uniqueDistricts = React.useMemo(() => {
    if (!branches || !branches.length) return [];

    const districtNames = branches
      .filter((branch) => branch && branch.district)
      .map((branch) => {
        return branch.district.name;
      })
      .filter((name) => name);

    const uniqueNames = [...new Set(districtNames)].sort((a, b) => a.localeCompare(b));
    return uniqueNames;
  }, [branches]);

  useEffect(() => {
    if (selectedArea && branches && branches.length > 0) {
      const branchWithArea = branches.find(
        (branch) => branch.areas && branch.areas.some((area) => area.name === selectedArea)
      );
      if (branchWithArea && branchWithArea.district) {
        setSelectedDistrict(branchWithArea.district.name);
      }
    }
  }, [selectedArea, branches]);

  useEffect(() => {
    if (selectedDistrict && branches.length > 0) {
      console.log("selectedDistrict", selectedDistrict);

      const areas = branches
        .filter((branch) => {
          const match = branch.district && branch.district.name === selectedDistrict;
          return match;
        })
        .flatMap((branch) => branch.areas || [])
        .sort((a, b) => a.name.localeCompare(b.name));
      console.log("areas", areas);
      console.log("branches", branches);
      setFilteredAreas(areas);
    } else {
      setFilteredAreas([]);
    }
  }, [selectedDistrict, branches]);

  const handleAreaSelect = (areaName, selectedBranchId) => {
    dispatch(setSelectedArea(areaName));
    dispatch(setBranchId(selectedBranchId));
  };

  const branchSelect = () => {
    if (branchId) localStorage.setItem("branchId", branchId);
    if (selectedArea) localStorage.setItem("selectedArea", selectedArea);
  };

  const handleDistrictChange = (e) => {
    const districtName = e.target.value;
    setSelectedDistrict(districtName);

    if (selectedArea) {
      const areaName = " ";
      dispatch(setSelectedArea(areaName));
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-2xl w-96 mx-auto mt-[30vh]">
      <h2 className="text-xl font-bold mb-4">Select Your Area</h2>

      <div className="text-xs text-gray-500 mb-2">Available districts: {uniqueDistricts.length}</div>

      <div className="space-y-3">
        <select value={selectedDistrict} onChange={handleDistrictChange} className="w-full p-2 border rounded-lg">
          <option value="">Select District</option>
          {uniqueDistricts.map((district, index) => (
            <option key={index} value={district}>
              {district}
            </option>
          ))}
        </select>

        <select
          value={selectedArea}
          onChange={(e) => {
            const areaName = e.target.value;
            if (areaName) {
              const selectedBranchId = branches.find(
                (branch) => branch.areas && branch.areas.some((area) => area.name === areaName)
              )?._id;
              handleAreaSelect(areaName, selectedBranchId);
            }
          }}
          className="w-full p-2 border rounded-lg"
          disabled={!selectedDistrict}
        >
          <option value="">Select Area</option>
          {filterAreas.map((area, idx) => (
            <option key={idx} value={area.name}>
              {area.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 flex justify-end space-x-4">
        <button
          onClick={() => {
            branchSelect();
            sendDataToParent(false);
            window.location.href = "/";
          }}
          className="px-4 py-2 bg-buttonColor text-white rounded-lg"
          disabled={!selectedArea}
        >
          Save
        </button>
        <button
          onClick={() => {
            window.location.href = "/";
            sendDataToParent(false);
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
