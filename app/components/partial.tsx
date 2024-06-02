

import { PartialNotification } from '../actions/notificationobject';
import { LineChart } from './chart/linechart';

export function Partial({
  partialObject,
  charttype,
}: {
  partialObject?: PartialNotification,
  charttype: string,
}) {
  
  let lineData = {
    label: "",
    labels: [],
    data: [],
  }
  if(!partialObject.notifications){
    lineData.labels = [];
lineData.data = [];
  }
  else{
    lineData.label = partialObject.notifications?.label;
lineData.labels = partialObject.notifications?.months;
lineData.data = partialObject.notifications?.rates;
  }
  return (
    <div>
        
                    
              {lineData.labels && lineData.labels.length > 0 && <LineChart lineChartData={lineData} charttype={charttype} />}

    </div>
  );
}
