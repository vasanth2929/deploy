import {
  Button,
  Checkbox,
  Divider,
  Group,
  LoadingOverlay,
  MultiSelect,
  Text,
} from "@mantine/core";
import {
  Dropzone,
  DropzoneStatus,
  IMAGE_MIME_TYPE,
  MIME_TYPES,
} from "@mantine/dropzone";
import React, { useEffect, useState } from "react";
import ReactSelect from "react-select";
import { Input } from "../../Components/Shared/Input";
import "./index.css";
import { Navbar } from "../../Components/Shared/Navbar";
import {
  categoryOptions,
  liscenceOptions,
  visibilityOptions,
} from "../../utils";
import {
  createAssets,
  getAsset,
  updateAsset,
} from "../../services/assets.service";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { isEmpty } from "lodash";

export const Upload = () => {
  const [tags, setTags] = useState<any>([]);
  const [value, setValue] = useState<any>([]);
  const navigate = useNavigate();
  const [visibility, setVisibility] = useState(visibilityOptions[0]);
  const [liscence, setLicence] = useState(liscenceOptions[0]);
  const [category, setCategory] = useState(null);
  const [files, setFiles] = useState<File | undefined>(undefined);
  const [title, setTitle] = useState("");
  const [draftloading, setDraftLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const routeParam = useParams();

  const params = useSearchParams();
  const id = params[0]?.get("id");
  const isInValid =
    isEmpty(title) ||
    isEmpty(category) ||
    isEmpty(tags) ||
    !accepted ||
    (isEmpty(files) && !id);
  const submit = (status: "draft" | "review") => {
    if (isInValid) return;
    if (status === "draft") setDraftLoading(true);
    else setLoading(true);
    const form = new FormData();
    form.append("tags", value.join(","));
    form.append("title", title);
    form.append("asset", files as any);
    form.append("visibility", visibility.value);
    form.append("liscence", liscence.value);
    form.append("category", (category as any).value);
    form.append("status", status);
    form.append("type", routeParam.type);
    let tabId = status === "draft" ? 3 : 1;
    if (id) {
      updateAsset(id, form)
        .then((res) => {
          navigate(`/my-uploads?tab=${tabId}`);
        })
        .finally(() => {
          setDraftLoading(false);
          setLoading(false);
        });
    } else
      createAssets(form)
        .then((res) => {
          navigate(`/my-uploads?tab=${tabId}`);
        })
        .finally(() => {
          setDraftLoading(false);
          setLoading(false);
        });
  };

  let mimeType: any = IMAGE_MIME_TYPE;

  switch (routeParam.type) {
    case "Video":
      mimeType = [MIME_TYPES.mp4];
      break;
    case "Music":
      mimeType = ["audio/mpeg"];
      break;
    case "3DModel":
      mimeType = ["application/x-zip-compressed"];
      // mimeType = ["application/object"];
      // mimeType = ["application/octet-stream"];
      break;
    default:
      mimeType = IMAGE_MIME_TYPE;
  }

  useEffect(() => {
    if (id)
      getAsset(id).then((t) => {
        const { category, tags, visibility, title } = t.data;
        setCategory({ value: category, label: category } as any);
        setValue(tags);
        setVisibility({
          label: visibility,
          value: visibility,
        });
        setTitle(title);
        setAccepted(true);
      });
  }, [id]);

  return (
    <div>
      <Navbar />

      <div className="w-max mx-auto">
        <LoadingOverlay visible={loading || draftloading} />
        <form>
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-[30px] my-7">Upload</h3>
              <div>
                <Button
                  variant="outline"
                  className="mx-5"
                  onClick={() => submit("draft")}
                  disabled={isInValid}
                >
                  Save as draft
                </Button>
                <Button
                  style={{ background: "#189EFF" }}
                  variant="filled"
                  onClick={() => submit("review")}
                  disabled={isInValid}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
          <div className="flex gap-10">
            <div className="w-[700px]">
              <div className="flex gap-5 mb-5">
                <div className="flex-1">
                  <Input
                    label="Title"
                    value={title}
                    onChange={(e: any) => setTitle(e.target.value)}
                  />
                </div>

                <div className="flex flex-col flex-1">
                  <label className="mb-1">Category</label>
                  <ReactSelect
                    className="category-menu"
                    placeholder="--Select Category--"
                    options={categoryOptions}
                    value={category}
                    onChange={(v) => setCategory(v as any)}
                    classNamePrefix="select"
                  />
                </div>
              </div>
              <div>
                <MultiSelect
                  creatable
                  data={tags}
                  maxSelectedValues={10}
                  onCreate={(query) => {
                    setTags([...tags, ...query.split(",")]);
                  }}
                  value={value}
                  onChange={(v) => {
                    const newVal = [];

                    v.forEach((k) => {
                      newVal.push(k.split(","));
                    });

                    setValue(newVal.flat());
                  }}
                  label="Tags"
                  searchable
                  getCreateLabel={(query) => `+ Create ${query}`}
                />
              </div>

              <div className="flex gap-5 mt-5">
                <div className="flex flex-col flex-1">
                  <label className="mb-1">Visibility</label>
                  <ReactSelect
                    className="category-menu"
                    options={visibilityOptions}
                    value={visibility}
                    onChange={(v) => setVisibility(v as any)}
                    classNamePrefix="select"
                  />
                </div>

                <div className="flex flex-col flex-1">
                  <label className="mb-1">License</label>
                  <ReactSelect
                    className="category-menu"
                    options={liscenceOptions}
                    value={liscence}
                    onChange={(v) => setLicence(v as any)}
                    classNamePrefix="select"
                  />
                </div>
              </div>
            </div>

            <Dropzone
              style={{ width: "400px" }}
              onDrop={(files) => setFiles(files[0])}
              onReject={(files) => console.log("rejected files", files)}
              maxSize={3 * 1024 ** 2}
              accept={mimeType}
            >
              {(status) => dropzoneChildren(status, files)}
            </Dropzone>
          </div>

          <div className="flex items-center mt-5">
            <Checkbox
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
            />
            <p className="max-w-[574px] text-sm ml-4 text-[#696969]">
              I only upload media that I own the rights to, not media that has
              been acquired or duplicated. I consent to the Stocklerz License
              being applied to my media.
            </p>
          </div>
        </form>

        <div className="my-8">
          <Divider />
          <h3 className="my-4 font-medium">File formats supported</h3>
          <div className="flex gap-10">
            <div className="max-w-[310px]">
              <h4 className="font-medium">Photos/Vectors</h4>
              <p className="mt-2 text-[#696969] text-sm">
                JPG, PNG, PSD, AI, and SVG images up to 40 MB with at least 3000
                pixels along one side.{" "}
                <a href="#" className="underline">
                  Image Quality Guidelines...
                </a>
              </p>
            </div>

            <div className="max-w-[310px]">
              <h4 className="font-medium">Videos</h4>
              <p className="mt-2 text-[#696969] text-sm">
                MPEG, MOV, and AVI videos up to 300 MB and a minimum resolution
                of 1920x800 pixels. Clips should be no longer than 60 seconds.
                <a href="#" className="underline">
                  Video Quality Guidelines....
                </a>
              </p>
            </div>

            <div className="max-w-[310px]">
              <h4 className="font-medium">Music/SFX</h4>
              <p className="mt-2 text-[#696969] text-sm">
                MP3, WAV, AAC,FLAC, AIF and M4A music up to 100MB file size
                limit. Duration should be no longer than 15 minutes.{" "}
                <a href="#" className="underline">
                  Music Quality Guidelines....
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const dropzoneChildren = (
  status: DropzoneStatus,
  file: File | undefined
) => (
  <Group
    position="center"
    spacing="xl"
    style={{ minHeight: 220, pointerEvents: "none" }}
  >
    <div className="text-center flex-1">
      {!file && (
        <>
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "50px" }}
          >
            cloud_download
          </span>
          <Text size="xl" inline>
            Drag & drop file here
          </Text>
          <Text size="sm" color="dimmed" inline mt={7}>
            {/* Maximum upload size 4 MB */}
          </Text>
        </>
      )}
      {file && (
        <>
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "50px" }}
          >
            cloud_download
          </span>
          <Text size="xl" inline>
            {file?.name}
          </Text>
        </>
      )}
    </div>
  </Group>
);
