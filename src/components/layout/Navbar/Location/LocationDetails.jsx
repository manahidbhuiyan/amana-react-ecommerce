import React, { useState } from "react";

const bdLocations = [
  {
    division: "Dhaka",
    districts: [
      {
        name: "Dhaka",
        areas: ["Gulshan", "Dhanmondi", "Motijheel"],
      },
      {
        name: "Gazipur",
        areas: ["Tongi", "Konabari", "Kaliakair"],
      },
    ],
  },
  {
    division: "Chattogram",
    districts: [
      {
        name: "Chattogram",
        areas: ["Agrabad", "GEC Circle", "Khatunganj"],
      },
      {
        name: "Cumilla",
        areas: ["Kandirpar", "Comilla Cantonment", "Burichang"],
      },
    ],
  },
  {
    division: "Rajshahi",
    districts: [
      {
        name: "Rajshahi",
        areas: ["Shaheb Bazar", "Motihar", "Rajshahi University"],
      },
      {
        name: "Bogura",
        areas: ["Satmatha", "Sherpur", "Mahasthangarh"],
      },
    ],
  },
];

const LocationDetails = ({ sendDataToParent }) => {
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const selectedDiv = bdLocations.find((div) => div.division === selectedDivision);
  const selectedDist = selectedDiv?.districts.find((dist) => dist.name === selectedDistrict);

  return (
    <div className="bg-white rounded-lg p-6 shadow-2xl w-96 mx-auto mt-[30vh]">
      <h2 className="text-xl font-bold mb-4">Select Your Area</h2>
      <div className="space-y-3">
        {/* Division Dropdown */}
        <select
          value={selectedDivision}
          onChange={(e) => {
            setSelectedDivision(e.target.value);
            setSelectedDistrict("");
            setSelectedArea("");
          }}
          className="w-full p-2 border rounded-lg"
        >
          <option value="">Select Division</option>
          {bdLocations.map((div, idx) => (
            <option key={idx} value={div.division}>
              {div.division}
            </option>
          ))}
        </select>

        {/* District Dropdown */}
        <select
          value={selectedDistrict}
          onChange={(e) => {
            setSelectedDistrict(e.target.value);
            setSelectedArea("");
          }}
          className="w-full p-2 border rounded-lg"
          disabled={!selectedDivision}
        >
          <option value="">Select District</option>
          {selectedDiv?.districts.map((dist, idx) => (
            <option key={idx} value={dist.name}>
              {dist.name}
            </option>
          ))}
        </select>

        {/* Area Dropdown */}
        <select value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)} className="w-full p-2 border rounded-lg" disabled={!selectedDistrict}>
          <option value="">Select Area</option>
          {selectedDist?.areas.map((area, idx) => (
            <option key={idx} value={area}>
              {area}
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
