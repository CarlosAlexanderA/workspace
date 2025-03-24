import {ContentHeader, DataUser} from '../../index';

export default function Header({stateConfig}) {
  return (
    <ContentHeader>
      <DataUser stateConfig={stateConfig} />
    </ContentHeader>
  );
}
