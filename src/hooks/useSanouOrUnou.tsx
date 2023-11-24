import { useRouter } from "next/router";

const useSanouOrUnou = () => {
  const router = useRouter();
  if (router.pathname.indexOf('sanou') !== -1) {
    return 'sanou';
  };
  if (router.pathname.indexOf('sanou') !== -1) {
    return 'unou';
  }
  return '';
};

export default useSanouOrUnou;