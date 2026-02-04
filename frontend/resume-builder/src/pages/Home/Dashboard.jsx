import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { LuCirclePlus } from 'react-icons/lu';
import moment from 'moment';
import ResumeSummaryCard from '../../components/Cards/ResumeSummaryCard';
import Modal from '../../components/Modal';
import CreateResumeForm from './CreateResumeForm';

const Dashboard = () => {
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [allResumes, setAllResumes] = useState(null);

  const fetchAllResumes = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.RESUME.GET_ALL);
      setAllResumes(response.data);
    } catch (error) {
      console.error("Error fetching resumes:", error);
    }
  };

  useEffect(() => {
    fetchAllResumes();
  } , []);

  return <DashboardLayout>
    <div className='grid grid-cols-1 md:grid-cols-4 gap-6 pt-1 pb-6 px-4 md:px-0'>
      <div 
        className='h-[350px] flex flex-col gap-5 items-center justify-center bg-white/80 backdrop-blur-md rounded-2xl border-2 border-dashed border-[#9C8D7F]/50 hover:border-[#9C8D7F] hover:bg-[#CDBFA5]/5 hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer transition-all duration-300'
        onClick={() => setOpenCreateModal(true)}
      >
        <div className='w-16 h-16 flex items-center justify-center bg-gradient-to-br from-[#9C8D7F] to-[#CDBFA5] rounded-2xl shadow-lg'>
          <LuCirclePlus className='text-3xl text-white' />
        </div>

        <h3 className='font-semibold text-[#2C3440] text-lg'>Add New Resume</h3>
      </div>

      {allResumes?.map((resume) => (
        <ResumeSummaryCard
          key={resume?._id}
          imgUrl={resume?.thumbnailLink || null}
          title={resume.title}
          lastUpdated={
            resume?.updatedAt
              ? moment(resume.updatedAt).format("DD MMM YYYY") 
              : ""
          }
          onSelect={()=>navigate(`/resume/${resume?._id}`)}
        />
      ))}
    </div>

    <Modal
      isOpen={openCreateModal}
      onClose={() => {
        setOpenCreateModal(false);
      }}
      hideHeader
    >
      <div>
        <CreateResumeForm />
      </div>
    </Modal>
  </DashboardLayout>
}

export default Dashboard;
