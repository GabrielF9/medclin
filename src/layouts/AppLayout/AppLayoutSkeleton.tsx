import Sidebar from './components/Sidebar';

interface AppLayoutSkeletonProps {
  title: string;
}

const AppLayoutSkeleton = ({ title }: AppLayoutSkeletonProps) => {
  return (
    <div className="flex h-screen w-screen flex-row">
      <Sidebar />

      <div className="flex max-h-screen flex-1 flex-col overflow-hidden px-2 py-3">
        <h1 className="text-2xl font-bold text-primary-500">{title}</h1>
        <div className="flex flex-col gap-3">
          <div className="skeleton h-[40px] w-[120px]" />
          <div className="skeleton h-4 w-full" />
          <div className="flex flex-row gap-3">
            <div className="skeleton h-4 flex-1" />
            <div className="skeleton h-4 flex-1" />
            <div className="skeleton h-4 flex-1" />
            <div className="skeleton h-4 flex-1" />
            <div className="skeleton h-4 flex-1" />
            <div className="skeleton h-4 flex-1" />
          </div>
          <div className="flex flex-row gap-3">
            <div className="skeleton h-4 flex-1" />
            <div className="skeleton h-4 flex-1" />
            <div className="skeleton h-4 flex-1" />
            <div className="skeleton h-4 flex-1" />
            <div className="skeleton h-4 flex-1" />
            <div className="skeleton h-4 flex-1" />
          </div>
          <div className="flex flex-row gap-3">
            <div className="skeleton h-4 flex-1" />
            <div className="skeleton h-4 flex-1" />
            <div className="skeleton h-4 flex-1" />
            <div className="skeleton h-4 flex-1" />
            <div className="skeleton h-4 flex-1" />
            <div className="skeleton h-4 flex-1" />
          </div>
          <div className="flex flex-row gap-3">
            <div className="skeleton h-4 flex-1" />
            <div className="skeleton h-4 flex-1" />
            <div className="skeleton h-4 flex-1" />
            <div className="skeleton h-4 flex-1" />
            <div className="skeleton h-4 flex-1" />
            <div className="skeleton h-4 flex-1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLayoutSkeleton;
