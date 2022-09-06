import { useRouter } from "next/router";
import { FC } from "react";
import Person from "../../src/components/page components/Person Page/Person";

interface personPageProps {}

const personPage: FC<personPageProps> = () => {
	const { id } = useRouter().query;
	console.log(id);
	return <Person id={id} />;
};

export default personPage;
