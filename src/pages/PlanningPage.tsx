import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AgGridReact } from 'ag-grid-react';
import { RootState } from '../store';
import { setPlanningData } from '../store';
import { PlanningData } from '../types';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export const PlanningPage: React.FC = () => {
  const dispatch = useDispatch();
  const { stores, skus, weeks, planningData } = useSelector((state: RootState) => state.app);

  const columnDefs = useMemo(() => {
    const baseColumns = [
      { field: 'store', headerName: 'Store', pinned: 'left' },
      { field: 'sku', headerName: 'SKU', pinned: 'left' },
    ];

    // Group weeks by month
    const weeksByMonth = weeks.reduce((acc, week) => {
      const month = week.month;
      if (!acc[month]) {
        acc[month] = [];
      }
      acc[month].push(week);
      return acc;
    }, {} as Record<string, typeof weeks>);

    const monthColumns = Object.entries(weeksByMonth).map(([month, monthWeeks]) => ({
      headerName: month,
      children: monthWeeks.flatMap((week) => [
        {
          headerName: `Week ${week.weekNumber}`,
          children: [
            {
              field: `${week.id}_units`,
              headerName: 'Sales Units',
              editable: true,
              type: 'numericColumn',
              valueParser: (params: any) => {
                const value = parseInt(params.newValue);
                return isNaN(value) ? 0 : value;
              },
              onCellValueChanged: (params: any) => {
                const { data, node } = params;
                const store = stores.find((s) => s.name === data.store);
                const sku = skus.find((s) => s.name === data.sku);
                
                if (!store || !sku) return;

                const salesUnits = params.newValue;
                const salesDollars = salesUnits * sku.price;
                const gmDollars = salesDollars - (salesUnits * sku.cost);
                const gmPercentage = salesDollars ? gmDollars / salesDollars : 0;

                const updatedEntry: PlanningData = {
                  storeId: store.id,
                  skuId: sku.id,
                  weekId: week.id,
                  salesUnits,
                  salesDollars,
                  gmDollars,
                  gmPercentage,
                };

                const newPlanningData = planningData.filter(
                  (entry) =>
                    !(
                      entry.storeId === store.id &&
                      entry.skuId === sku.id &&
                      entry.weekId === week.id
                    )
                );

                dispatch(setPlanningData([...newPlanningData, updatedEntry]));
                
                // Update the other cells in the same row
                node.setDataValue(`${week.id}_sales`, salesDollars);
                node.setDataValue(`${week.id}_gm`, gmDollars);
                node.setDataValue(`${week.id}_gm_percent`, gmPercentage);
              },
            },
            {
              field: `${week.id}_sales`,
              headerName: 'Sales $',
              type: 'numericColumn',
              editable: false,
              valueFormatter: (params: any) =>
                params.value?.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }),
            },
            {
              field: `${week.id}_gm`,
              headerName: 'GM $',
              type: 'numericColumn',
              editable: false,
              valueFormatter: (params: any) =>
                params.value?.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }),
            },
            {
              field: `${week.id}_gm_percent`,
              headerName: 'GM %',
              type: 'numericColumn',
              editable: false,
              valueFormatter: (params: any) =>
                params.value ? `${(params.value * 100).toFixed(1)}%` : '',
              cellStyle: (params: any) => {
                const value = params.value;
                if (value >= 0.4) return { backgroundColor: '#10B981' }; // Green
                if (value >= 0.1) return { backgroundColor: '#FBBF24' }; // Yellow
                if (value > 0.05) return { backgroundColor: '#F97316' }; // Orange
                return { backgroundColor: '#EF4444' }; // Red
              },
            },
          ],
        },
      ]),
    }));

    return [...baseColumns, ...monthColumns];
  }, [weeks, stores, skus, planningData, dispatch]);

  const rowData = useMemo(() => {
    const rows: any[] = [];
    stores.forEach((store) => {
      skus.forEach((sku) => {
        const row: any = {
          store: store.name,
          sku: sku.name,
        };

        weeks.forEach((week) => {
          const planningEntry = planningData.find(
            (entry) =>
              entry.storeId === store.id &&
              entry.skuId === sku.id &&
              entry.weekId === week.id
          );

          row[`${week.id}_units`] = planningEntry?.salesUnits || 0;
          row[`${week.id}_sales`] = planningEntry?.salesDollars || 0;
          row[`${week.id}_gm`] = planningEntry?.gmDollars || 0;
          row[`${week.id}_gm_percent`] = planningEntry?.gmPercentage || 0;
        });

        rows.push(row);
      });
    });
    return rows;
  }, [stores, skus, weeks, planningData]);

  return (
    <div className="h-full">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Planning</h1>
      <div className="ag-theme-alpine h-[calc(100vh-12rem)]">
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
          defaultColDef={{
            sortable: true,
            filter: true,
            resizable: true,
            minWidth: 100,
          }}
          suppressColumnVirtualisation={true}
          enableRangeSelection={true}
          groupDisplayType="groupRows"
        />
      </div>
    </div>
  );
};