
export interface FooterTableWorkingTimeProps {
  data: string;
}

const FooterTableWorkingTime = ({data}: FooterTableWorkingTimeProps) => {
  return (
    <div className="flex flex-row justify-end">
      <p>{data}</p>
    </div>
  );
};

export default FooterTableWorkingTime;
