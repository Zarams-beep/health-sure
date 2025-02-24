import PropTypes from "prop-types";
import { FaArrowDown, FaArrowUp, FaHeart, FaTachometerAlt, FaTint, FaLungs } from "react-icons/fa";

interface CardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  bgColor: string;
  type: string;
}

const Card = ({ title, value, change, icon, bgColor, type }: CardProps) => {
  return (
    <div className="dashboard-card-section" style={{ backgroundColor: bgColor }}>
      <div className="dashboard-card-section-2">
        <h3 className="">{title} ({type})</h3>
        {icon}
      </div>
      <div className="">
        <p className="">{value}</p>
        <div className="">
          <span className={`text-sm ${change.includes("+") ? "text-green-600" : "text-red-600"}`}>{change}</span>
          {change.includes("+") ? <FaArrowUp className="text-green-600" /> : <FaArrowDown className="text-red-600" />}
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  change: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  bgColor: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

const CardsSection = () => {
  return (
    <div className="dashboard-card-main">
      <Card title="Heart Rate" value="72 BPM" change="+3%" icon={<FaHeart className="icon-style icon-style-1" />} bgColor="#FDE2E4" type="Vital Sign" />
      <Card title="Blood Pressure" value="120/80 mmHg" change="-1%" icon={<FaTachometerAlt className="icon-style icon-style-2" />} bgColor="#E6F1FD" type="Vital Sign" />
      <Card title="Blood Sugar" value="98 mg/dL" change="+5%" icon={<FaTint className="icon-style icon-style-3" />} bgColor="#FFF4E6" type="Glucose Level" />
      <Card title="Oxygen Saturation" value="97% SpO2" change="-2%" icon={<FaLungs className="icon-style icon-style-4" />} bgColor="#E2FCE4" type="Oxygen Level" />
    </div>
  );
};

export default CardsSection;
