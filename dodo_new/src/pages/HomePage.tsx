import { useState } from 'react';
import { Header } from '../app/components/homeboard/Header';
import AIBriefing from '../app/components/homeboard/AIBriefing';
import { TodaySchedule } from '../app/components/homeboard/TodaySchedule';
import { UpcomingSchedule } from '../app/components/homeboard/UpcomingSchedule';
import { RegisteredRoutines } from '../app/components/homeboard/RegisteredRoutines';
import { Memo } from '../app/components/homeboard/Memo';
import { StoreRecommendation } from '../app/components/homeboard/StoreRecommendation';

export default function HomePage() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 items-start">
      <div className="col-span-2 lg:col-span-2"><AIBriefing /></div>
      <div className="col-span-2 lg:col-span-1"><Memo /></div>
      <TodaySchedule />
      <UpcomingSchedule />
      <RegisteredRoutines />
      <div className="col-span-2 lg:col-span-3"><StoreRecommendation /></div>
    </div>
  );
}