import * as React from "react";
import "./styles.css";

const Option = (props) => (
  <p className="plan-card-option">
    <span>
      <svg
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2.5"
        viewBox="0 0 24 24"
      >
        <path d="M20 6L9 17l-5-5"></path>
      </svg>
    </span>
    {props.label}
  </p>
);

const PlanCard = (props) => {
  const {
    type,
    name,
    price,
    description,
    serviceTypes,
    optionsCount = 0,
    handleBookCarWash,
  } = props;
  const filteredOptions = serviceTypes.interior.length - optionsCount;

  const interiorOptions = serviceTypes.interior
    .slice(0, filteredOptions)
    .map((item, idx) => ({
      id: idx + 1,
      label: item,
    }));

  const exteriorOptions = serviceTypes.exterior
    .slice(0, filteredOptions)
    .map((item, idx) => ({
      id: idx + 1,
      label: item,
    }));

  return (
    <div className="plan-card">
      <div className="selected">
        <span>{type}</span>
        <h2>{name}</h2>
        <h1>{price}</h1>
        <h2>Interior</h2>
        <div className="plan-options-section">
          {interiorOptions.map((option) => (
            <Option label={option.label} />
          ))}
        </div>
        <h2>Exterior</h2>
        <div className="plan-options-section">
          {exteriorOptions.map((option) => (
            <Option label={option.label} />
          ))}
        </div>
        <button className="plan-button" onClick={handleBookCarWash}>
          {`Book for ${price}`}
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
        <p className="plan-description">
          {description ||
            "Literally you probably haven't heard of them jean shorts."}
        </p>
      </div>
    </div>
  );
};

export const PlansSelection = (props) => {
  const { promoRate, serviceTypes, handleBookCarWash } = props || {};
  return (
    <div className="plans-container">
      <PlanCard
        type="BASIC"
        name="START"
        price={`$${promoRate}`}
        optionsCount={2}
        serviceTypes={serviceTypes}
        handleBookCarWash={handleBookCarWash}
      />
      <PlanCard
        type="POPULAR"
        name="PRO"
        price={`$${promoRate * 1.5}`}
        optionsCount={1}
        serviceTypes={serviceTypes}
        handleBookCarWash={handleBookCarWash}
      />
      <PlanCard
        type="SPECIAL"
        name="CLASSIC"
        price={`$${promoRate * 2}`}
        serviceTypes={serviceTypes}
        handleBookCarWash={handleBookCarWash}
      />
    </div>
  );
};
