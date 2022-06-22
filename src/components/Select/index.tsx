import React, {useState} from 'react';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';

interface Select {
	label: string;
	value: string | number;
}

interface SelectProps {
	label?: string;
	options: any;
	setSelected: any;
	selected: Select;
}

const RSelect: React.FC<SelectProps> = ({ label, options, setSelected, selected }) => {
	const [isActive, setIsActive] = useState(false);

	const onSelected = (item: any) => {
		setSelected(item);
		setIsActive(false);
	};

	return (
		<div className="select-container">
			{label && <label className="label">{label}</label>}
			<div className="select">
				<div className="select-header" onClick={() => setIsActive(!isActive)}>
					<p>{selected?.label}</p>
					<span>
						{isActive ? <BiChevronUp /> : <BiChevronDown />}
					</span>
				</div>
				{
					isActive &&
          <div className="select-content">
          	{
          		options.map((item: any, index: number) => (
          			<div className="select-item" key={index} onClick={() => onSelected(item)}>
          				{item?.label}
          			</div>
          		))
          	}
          </div>
				}
			</div>
		</div>
	);
};

export default RSelect;
