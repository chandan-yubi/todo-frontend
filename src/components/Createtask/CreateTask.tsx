import { useFormik } from "formik";
import "./CreateTask.css";
import { taskService } from "../../services/task/task.service";
import { ModalProps } from "../../models/ModalProps";
import toast from "react-hot-toast";
import { useState } from "react";
import Label from "../Label/Label";
import { TaskData } from "../../models/TaskData";
import { IKContext, IKUpload } from "imagekitio-react";
import imagekitConfig from "../../imagekitConfig";
import ProgressBar from "@ramonak/react-progress-bar";
import Loader from "../Loader/Loader";

const CreateTask = (props: ModalProps) => {
  console.log("Create Props", props);
  const [tag, setTag] = useState("");
  const { isEdit } = props.items;
  const [uploadedPercentage, setUploadedPercentage] = useState(0.0);
  const [uploading, setUploading] = useState(false);

  const taskData: TaskData = props.additionalProps?.task;

  const onSuccessImageUpload = (res: any) => {
    toast.success("Image Uploaded");
    formik.setFieldValue("attachment", res.url);
    setUploading(false);
  };

  const onErrorImageUpload = (err: any) => {
    console.log("Error", err);
    toast.error("Image Upload Failed");
  };

  const formik = useFormik({
    initialValues: {
      title: isEdit ? taskData?.attributes?.title : "",
      description: isEdit ? taskData?.attributes?.description : "",
      priority: isEdit ? taskData?.attributes?.priority : "",
      group: isEdit ? taskData?.attributes?.group : "",
      due_date: isEdit ? taskData?.attributes?.due_date : "",
      remainder: isEdit ? taskData?.attributes?.remainder : "",
      tags: isEdit ? taskData?.attributes?.tags : [],
      attachment: isEdit ? taskData?.attributes?.attachment : null,
    },
    onSubmit: (values) => {
      if (isEdit) {
        taskService
          .updateTask(taskData.id, values)
          .then((response) => {
            console.log(response);
            toast.success("Successfully updated!");
            props.closeModal();
            props.additionalProps?.fetchTaskData();
            props.items.fetchAllTasks();
          })
          .catch((err) => {
            console.log("Error Response", err);
            toast.error("Something went wrong!");
          });
      } else {
        taskService
          .createTask(values)
          .then((response) => {
            console.log(response);
            toast.success("Successfully created!");
            props.closeModal();
            props.items.fetchAllTasks();
          })
          .catch((err) => {
            console.log("Error Response", err);
            toast.error("Something went wrong!");
          });
      }
      console.log("Submitted", values);
    },
    validate: (values) => {
      let errors: any = {};
      if (!values.title) {
        errors.title = "Required";
      }
      if (!values.description) {
        errors.description = "Required";
      }
      if (!values.priority) {
        errors.priority = "Required";
      }
      if (!values.group) {
        errors.group = "Required";
      }
      if (!values.due_date) {
        errors.due_date = "Required";
      }
      if (!values.remainder) {
        errors.remainder = "Required";
      }
      return errors;
    },
  });
  console.log("Formik", formik.values);

  const handleTagChange = (e: any) => {
    setTag(e.target.value);
    if (e.key === " ") {
      console.log("I am Space", e.target.value);
      let tagPayload = {
        tag: tag,
      };
      formik.setFieldValue("tags", [...formik.values.tags, tagPayload]);
      setTag("");
    }
  };

  const handleUploadProgress = (progressEvent: any) => {
    setUploadedPercentage(
      Math.round((progressEvent.loaded * 100) / progressEvent.total)
    );
    console.log("Upload Progress", progressEvent);
  };

  const handleRemoveAttachment = () => {
    formik.setFieldValue("attachment", null);
  };

  const handleRemoveTag = (index: number) => {
    const newTags = [...formik.values.tags];
    newTags.splice(index, 1);
    formik.setFieldValue("tags", newTags);
  };

  // console.log("error", formik.errors);

  return (
    <div className="task-form-page">
      <div className="task-form-container">
        <h2>{props.items.isEdit ? "Edit" : "Create a New"} Task</h2>
        <form onSubmit={formik.handleSubmit}>
          {/* Title */}
          <div className="task-form-field">
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter title"
              onChange={formik.handleChange}
              value={formik.values.title}
            />
            <div className="error">
              {formik.errors.title ? formik.errors.title : null}
            </div>
          </div>

          {/* Description */}
          <div className="task-form-field">
            <input
              type="text"
              id="description"
              name="description"
              placeholder="Enter description"
              onChange={formik.handleChange}
              value={formik.values.description}
            />
            <div className="error">
              {formik.errors.description ? formik.errors.description : null}
            </div>
          </div>

          <div className="task-form-field">
            <select
              id="priority"
              name="priority"
              onChange={formik.handleChange}
              value={formik.values.priority}
            >
              <option value="">Select Priority</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>
            <div className="error">
              {formik.errors.priority ? formik.errors.priority : null}
            </div>
          </div>

          {/* Group */}
          <div className="task-form-field">
            <select
              id="group"
              name="group"
              onChange={formik.handleChange}
              value={formik.values.group}
            >
              <option value="">Select Group</option>
              <option value="HOME">Home</option>
              <option value="FAMILY">Family</option>
              <option value="OFFICE">Office</option>
              <option value="WORK">Work</option>
              <option value="HEALTH">Health</option>
              <option value="PERSONAL">Personal</option>
              <option value="LOVE">Love</option>
            </select>
            <div className="error">
              {formik.errors.group ? formik.errors.group : null}
            </div>
          </div>

          {/* Due Date */}
          <div className="task-form-field">
            <input
              type="date"
              id="due_date"
              name="due_date"
              onChange={formik.handleChange}
              value={formik.values.due_date}
            />
            <div className="error">
              {formik.errors.due_date ? formik.errors.due_date : null}
            </div>
          </div>

          <div className="task-form-field">
            <input
              type="date"
              id="remainder"
              name="remainder"
              onChange={formik.handleChange}
              value={formik.values.remainder}
            />
            <div className="error">
              {formik.errors.remainder ? formik.errors.remainder : null}
            </div>
          </div>
          <div className="task-form-field">
            <div className="entered-tags">
              {formik.values.tags?.map((tag: any, index: number) => (
                <div className="tag-list" key={index}>
                  <div
                    className="tag-remove"
                    onClick={() => handleRemoveTag(index)}
                  >
                    x
                  </div>
                  <Label label={tag.tag} $number={index} />
                </div>
              ))}
            </div>
            <input
              type="text"
              id="tags"
              name="tags"
              placeholder="Enter tags (press space to add)"
              onKeyUp={(e) => handleTagChange(e)}
              onChange={(e) => setTag(e.target.value)}
              value={tag}
            />
            <div className="error"></div>
          </div>

          <div className="file-upload-container">
            {uploading && (
              <div className="image-upload-loader">
                <Loader />
                <p>{uploadedPercentage}%</p>
              </div>
            )}
            {formik.values.attachment ? (
              <div className="uploaded-image">
                <div
                  className="delete-uploaded-image"
                  onClick={() => handleRemoveAttachment()}
                >
                  x
                </div>
                <img src={formik.values.attachment} alt="uploaded" />
              </div>
            ) : !uploading ? (
              <div className="imagekit-upload-container">
                <label
                  htmlFor="imagekit-upload"
                  className="imagekit-upload-label"
                >
                  <img
                    src="https://cdn2.iconfinder.com/data/icons/font-awesome/1792/upload-512.png"
                    alt=""
                  />
                </label>
                <IKContext
                  publicKey={imagekitConfig.publicKey}
                  urlEndpoint={imagekitConfig.urlEndpoint}
                  authenticator={imagekitConfig.authenticator}
                >
                  <IKUpload
                    onUploadStart={() => setUploading(true)}
                    onUploadProgress={handleUploadProgress}
                    className="imagekit-upload"
                    id="imagekit-upload"
                    fileName="test-upload.png"
                    onError={onErrorImageUpload}
                    onSuccess={onSuccessImageUpload}
                  />
                </IKContext>
              </div>
            ): null}
          </div>
          <div className="task-form-field">
            <button type="submit">Create task</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
