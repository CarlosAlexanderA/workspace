import {ContentHeader, DataUser} from '../../index';

export default function Header({stateConfig}) {
  return (
    <ContentHeader>
      <div onClick={(e) => e.stopPropagation()}>
        <DataUser stateConfig={stateConfig} />
      </div>
    </ContentHeader>
  );
}
