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


const IMSRoutes = () => {
  return (
    <DashboardLayout slots={{
      toolbarActions: Notifications,
    }}>
        <Routes>
          <Route path="/" element={<IMSOverviewPage />} />
          <Route path="/ims/items/list" element={<Box p={4}><ItemListPage/></Box>} />
          <Route path="/ims/items/purchases" element={<Box p={4}><ItemPurchasePage /></Box>} />
          <Route path="/ims/items/sales" element={<Box p={4}><ItemSalesPage /></Box>} />
          <Route path="/ims/items/purchase-return" element={<Box p={4}><ItemPurchaseReturnPage /></Box>} />
          <Route path="/ims/items/sales-return" element={<Box p={4}><ItemSalesReturnPage /></Box>} />
          <Route path="/ims/items/defective" element={<Box p={4}><DefectiveProductsPage /></Box>} />
        </Routes>
      </DashboardLayout>
  )
}

export default IMSRoutes;
