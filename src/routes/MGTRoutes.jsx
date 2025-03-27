import React from 'react'
import { Routes, Route} from 'react-router-dom';
import {Box} from '../components/MUI';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import ItemListPage from '../pages/modules/IMS/ItemListPage';
import IMSOverviewPage from '../pages/modules/IMS/IMSOverviewPage';
import ItemPurchasePage from '../pages/modules/IMS/ItemPurchasePage';
import ItemSalesPage from '../pages/modules/IMS/ItemSalesPage';
import ItemPurchaseReturnPage from '../pages/modules/IMS/ItemPurchaseReturnPage';
import ItemSalesReturnPage from '../pages/modules/IMS/ItemSalesReturnPage';
import Notifications from '../components/common/Notifications';
import DefectiveProductsPage from '../pages/modules/IMS/DefectiveProductsPage';
import MGTOverviewPage from '../pages/modules/MGT/MGTOverviewPage';


const MGTRoutes = () => {
  return (
    <DashboardLayout slots={{
      toolbarActions: Notifications,
    }}>
        <Routes>
          <Route path="/" element={<MGTOverviewPage />} />
          <Route path="/ims/items/list" element={<Box p={4}><ItemListPage/></Box>} />
          <Route path="/ims/items/purchases" element={<Box p={4}><ItemPurchasePage /></Box>} />
          <Route path="/ims/items/sales" element={<Box p={4}><ItemSalesPage /></Box>} />
          <Route path="/ims/items/purchase-return" element={<Box p={4}><ItemPurchaseReturnPage /></Box>} />
          <Route path="/ims/items/sales-return" element={<Box p={4}><ItemSalesReturnPage /></Box>} />
          <Route path="/ims/items/defective" element={<Box p={4}><DefectiveProductsPage /></Box>} />
          {/* <Route path="/items/sales" element={<Box p={4}><I /></Box>} /> */}
          {/* <Route path="/items/outward" element={<Box p={4}><ItemOutwardPage transactionType="outward"/></Box>} /> */}
          <Route path="/ims/items/categories" element={<Box p={4}>Categories Page</Box>} />
          <Route path="/items/low-stock" element={<Box p={4}>Low Stock Items Page</Box>} />
          <Route path="/reports/stock-analysis" element={<Box p={4}>Stock Analysis Page</Box>} />
          <Route path="/reports/movement" element={<Box p={4}>Stock Movement Page</Box>} />
          <Route path="/settings" element={<Box p={4}>Settings Page</Box>} />
          <Route path="*" element={<Box p={4}>404: Page not found</Box>} />
        </Routes>
      </DashboardLayout>
  )
}

export default MGTRoutes;
