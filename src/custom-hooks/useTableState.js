import { useState, useMemo } from 'react';


export const useTableState = (initialRows = [], initialRowsPerPage = 10) => {
  // console.log('initialRows', initialRows)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [actionAnchorEl, setActionAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = useMemo(() => {
    return initialRows?.filter((item) => {
      // console.log('itemmmm', item)
      const searchLower = searchTerm.trim().toLowerCase();
      const matchesSearch = item.employeeId?.toLowerCase() || item.employeeName?.toLowerCase() || item.employeeId?.toLowerCase().includes(searchLower) || item.name?.toLowerCase().includes(searchLower) || item.basicInfo?.firstName.toLowerCase().includes(searchLower) || item.inventoryType?.toLowerCase().includes(searchLower)
      const matchesCategory = categoryFilter === 'all' || item.category?.toLowerCase() === categoryFilter.toLowerCase();
      // console.log('matchesCategory', matchesCategory)
      // console.log('matchesSearch', matchesSearch)
      return matchesSearch && matchesCategory;
    });
  }, [initialRows, searchTerm, categoryFilter]);


  // console.log('filteredItems',filteredItems)
  const paginatedItems = useMemo(() => {
    return filteredItems.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [filteredItems, page, rowsPerPage]);

  return {
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    filterAnchorEl,
    setFilterAnchorEl,
    isFilterDrawerOpen,
    setIsFilterDrawerOpen,
    actionAnchorEl,
    setActionAnchorEl,
    selectedItem,
    setSelectedItem,
    filteredItems,
    paginatedItems
  };
};