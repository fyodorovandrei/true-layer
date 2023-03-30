import React from 'react';
import * as classnames from "./PokemonCard.module.css";

type Props = {
	image: string;
	name: string;
}

const PokemonCard: React.FC<Props> = ({ image, name }) => {
	return (
		<div className={classnames.card}>
			<img className={classnames.image} src={image} alt={name}/>
			<p className={classnames.name}>{name}</p>
		</div>
	);
};

export default PokemonCard;
