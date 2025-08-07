import FuelCostBarGraph from '@/components/responsive/fuel-cost-calcultor/FuelCostBarGraph'
import FuelCostInfoBlock from '@/components/responsive/fuel-cost-calcultor/FuelCostInfoBlock'
import FuelCostTable from '@/components/responsive/fuel-cost-calcultor/FuelCostTable'
import FuelCostTopBar from '@/components/responsive/fuel-cost-calcultor/FuelCostTopBar'
import QuickLinks from '@/components/responsive/fuel-cost-calcultor/QuickLinks'
import React from 'react'

export default function page() {
  return (
    <div>
      
      <FuelCostTopBar/>
      <FuelCostTable/>
      <FuelCostInfoBlock/>
      <FuelCostBarGraph/>
      <QuickLinks/>

    </div>
  )
}
