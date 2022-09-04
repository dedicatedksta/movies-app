import { useRouter } from "next/router";
import React from "react";
import ItemP from "../src/components/page components/Item Page/ItemP";
import Navbar from "../src/components/ui/navbar/Navbar";

const ItemPage = () => {
	const slug = useRouter().query.slug;
	if (!slug) return <div>nothing was found</div>;
	return (
		<>
			<Navbar transparent={true} />
			<ItemP itemType={slug[0]} itemId={slug[1]} />
		</>
	);
};

export default ItemPage;
