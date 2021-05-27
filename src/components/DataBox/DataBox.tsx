import React, { ReactElement } from 'react'
import styles from "./dataBox.module.css";

interface Props {
	children: string | number;
	label: string;
	unit?: string;
	additionalInfo?: string[];
}

export default function DataBox({ children, label, unit, additionalInfo = [] }: Props): ReactElement {
	return (
		<div className={styles.box}>
			<span className={styles.label}>{label}</span>
			<div 
				className={styles.value}
			>
				{children}
				<span className={styles.unit}>{unit}</span>
			</div>
			<div className={styles.additionalInfo}>{additionalInfo.map( (info, index) => (
				<div key={index} className={styles.info}>{info}</div>
			))}</div>
		</div>
	)
}
