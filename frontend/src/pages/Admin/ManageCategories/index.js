import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input, Pagination, Table } from "antd";
import AdminLayout from "~/layouts/AdminLayout"; 
import classNames from 'classnames/bind';
import styles from './ManageCategories.module.scss';

function ManageCategories() { 
    const cx = classNames.bind({ ...styles, container: 'container' });
    return (
        <AdminLayout>
            <div>
                <div className={cx('options')}>
                    <Input.Search
                        placeholder="Search by name"
                        allowClear
                        enterButton
                        // value={searchKeyword}
                        // onChange={(e) => setSearchKeyword(e.target.value)}
                        // onSearch={() => fetchUsers(currentPage, searchKeyword)}
                    />
                    {/* <Button type="primary" style={{ marginLeft: '8px' }} onClick={() => setIsAddModalVisible(true)}>
                        <FontAwesomeIcon icon={faAdd} />
                    </Button> */}
                </div>
                {/* <Table dataSource={dataSource} columns={columns} pagination={false} />
                {totalUsers && numberUsersPerPage && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={Math.ceil(totalUsers / numberUsersPerPage)}
                        onPageChange={(pageNumber) => {
                            setCurrentPage(pageNumber);
                            fetchUsers(pageNumber, searchKeyword);
                        }}
                    />
                )} */}
            </div>
        </AdminLayout>
    );
}

export default ManageCategories;
