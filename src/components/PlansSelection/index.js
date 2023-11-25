import * as React from "react";
import "./styles.css";

const Option = (props) => (
  <p className="plan-card-option">
    <span>
      <svg
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
        viewBox="0 0 24 24"
      >
        <path d="M20 6L9 17l-5-5"></path>
      </svg>
    </span>
    {props.label}
  </p>
);

const PlanCard = (props) => {
  const { type, name, price, description, serviceTypes, handleBookCarWash } =
    props;

  // const filteredOptions = serviceTypes.interior.length - optionsCount;

  // const interiorOptions = serviceTypes.interior
  //   .slice(0, filteredOptions)
  //   .map((item, idx) => ({
  //     id: idx + 1,
  //     label: item,
  //   }));

  // const exteriorOptions = serviceTypes.exterior
  //   .slice(0, filteredOptions)
  //   .map((item, idx) => ({
  //     id: idx + 1,
  //     label: item,
  //   }));

  return (
    <div className="plan-card">
      <div className="selected">
        <span>{type}</span>
        <h2>{name}</h2>
        <h1>{price}</h1>
        {/* <h2>Interior</h2> */}
        <div className="plan-options-section">
          {serviceTypes.map((option) => (
            <Option key={option.id} label={option.name} />
          ))}
        </div>
        {/* <h2>Exterior</h2> */}
        {/* <div className="plan-options-section">
          {exteriorOptions.map((option, index) => (
            <Option key={index} label={option.label} />
          ))}
        </div> */}
        <button className="plan-button" onClick={handleBookCarWash}>
          {`Book for ${price}`}
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
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
  console.log(props);
  const { promoRate, handleBookCarWash, servicePlans = [] } = props || {};

  const basicService = servicePlans?.filter((plan) =>
    plan.availablePlans.includes("Basic")
  );

  const classicService = servicePlans?.filter((plan) =>
    plan.availablePlans.includes("Classic")
  );

  const premiumService = servicePlans?.filter((plan) =>
    plan.availablePlans.includes("Premium")
  );

  const platinumService = servicePlans?.filter((plan) =>
    plan.availablePlans.includes("Platinum")
  );

  return (
    <div className="plans-container">
      {basicService && (
        <PlanCard
          type="BASIC"
          name="START"
          price={`$${promoRate}`}
          serviceTypes={basicService}
          handleBookCarWash={() => handleBookCarWash(promoRate)}
        />
      )}
      {classicService && (
        <PlanCard
          type="CLASSIC"
          name="PRO"
          price={`$${promoRate * 1.5}`}
          serviceTypes={classicService}
          handleBookCarWash={() => handleBookCarWash(promoRate * 1.5)}
        />
      )}
      {premiumService && (
        <PlanCard
          type="PREMIUM"
          name="BEST BUNDLE"
          price={`$${promoRate * 2}`}
          serviceTypes={premiumService}
          handleBookCarWash={() => handleBookCarWash(promoRate * 2)}
        />
      )}
      {platinumService && (
        <PlanCard
          type="PLATINUM"
          name="FULL PACKAGE"
          price={`$${promoRate * 2}`}
          serviceTypes={platinumService}
          handleBookCarWash={() => handleBookCarWash(promoRate * 2)}
        />
      )}
    </div>
  );
};
