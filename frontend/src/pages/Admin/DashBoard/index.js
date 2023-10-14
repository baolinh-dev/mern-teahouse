import AdminLayout from "~/layouts/AdminLayout";
import CategoryCountChart from "./CategoryCountChart";
import DailyRevenueStatistics from "./DailyRevenueStatistics";
import MonthlyRevenueStatistics from "./MonthlyRevenueStatistics";

import classNames from 'classnames/bind';
import styles from './DashBoard.module.scss';
const cx = classNames.bind({ ...styles, container: 'container' });

function AdminDashboard() {


  return (
    <AdminLayout> 
      <main>
      <CategoryCountChart /> 
      <DailyRevenueStatistics />
      </main> 
      <MonthlyRevenueStatistics />
    </AdminLayout>
  );
}

export default AdminDashboard;