import { useRouter } from "next/router";
import Person from "../../src/components/page components/Person Page/Person";

const PersonPage = () => {
	const { id } = useRouter().query;
	console.log(id);
	return <Person id={id} />;
};

export default PersonPage;
