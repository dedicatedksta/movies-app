import { useRouter } from "next/router";
import React from "react";
import ItemP from "../src/components/page components/Item Page/ItemP";
import Navbar from "../src/components/ui/navbar/Navbar";

const ItemPage = () => {
	const { id } = useRouter().query;
	return (
		<>
			<Navbar transparent={true} />
			<ItemP itemId={id} />
		</>
	);
};

export default ItemPage;
