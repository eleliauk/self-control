import {Card, Divider, Form, InputNumber, Radio, Slider, Rate, Button, Input} from "antd";
import { post } from "../fetch";
import { UserLearningData } from "../type";
interface Result {
    code:number,
    msg:string,
    result:Record<string, unknown>
}
function FeedForm() {
    // const handleWX = () => {
    //     const open_id = new URLSearchParams(window.location.search).get('open_id') || '';

    //     console.log('code', open_id);
    //     const username = new URLSearchParams(window.location.search).get('open_id') || '';

    //     console.log('code', username);

    // };
    const [form] = Form.useForm();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const onFinish = async (values) => {
        // Prepare the data to be sent to the API
        const requestData= {
            openid: new URLSearchParams(window.location.search).get('open_id') || 'openid_51d6cb63f2ca', // Get openid, fallback to a default
            chineseLearnDegree: values.chineseLearnDegree,
            mathLearnDegree: values.mathLearnDegree,
            englishLearnDegree: values.englishLearnDegree,
            coursePreviewDuration: values.coursePreviewDuration,
            coursePreviewCompletion: values.coursePreviewCompletion,
            coursePreviewReadMaterial: values.coursePreviewReadMaterial,
            coursePreviewMark: values.coursePreviewMark,
            coursePreviewAskQuestion: values.coursePreviewAskQuestion,
            reviewedDuration: values.reviewedDuration,  // Use the correct field names
            reviewedCompletion: values.reviewedCompletion,
            reviewedNewKnowledge: values.reviewedReadMaterial, // Map form field names to API field names
            reviewedLeakFilling: values.reviewedMark,
            reviewedCarding: values.reviewedAskQuestion,
            homeworkPracticeDuration: values.homeworkPracticeDuration,
            homeworkPracticeCompletion: values.homeworkPracticeCompletion,
            homeworkPracticeFinish: values.homeworkPracticeReadMaterial, // Map form field names
            homeworkPracticeFocus: values.homeworkPracticeMark,
            homeworkPracticeCheck: values.homeworkPracticeAskQuestion,
            selfEvalReflect: values.selfEvalReflect,
            selfEvalMessage: values.selfEvalMessage,
            createTime:Date.now().toString(),
            updateTime:Date.now().toString()
            // createTime and updateTime are typically handled server-side
        };

        try {
            const response = await post<Result,UserLearningData>('/wxPunchClock/saveTodayELLearnReflect', requestData); // Replace '/your-api-endpoint'
            console.log('Success:', response);
            // Handle success (e.g., show a success message, redirect, etc.)
            alert("提交成功！"); // Simple success feedback
            form.resetFields(); //clear form after submit.
        } catch (error) {
            console.error('Error:', error);
            // Handle errors (e.g., show an error message)
         //   alert(`提交失败: ${error.message}`);
        }
    };

    // const onFinishFailed = (errorInfo: any) => {
    //     console.log('Failed:', errorInfo);
    //     alert("提交失败，请检查表单");
    // };
    return (

        <div className="bg-blue-100 min-h-screen flex justify-center items-center">
            <Card className="w-[90vw] p-5 text-center bg-white">
                <Form layout="vertical">
                <h1 className="text-center font-bold text-xl text-blue-500">今日学习反思与评价</h1>
                <div>
                    同学们，今天学习任务结束后，不妨静下心染对自己当天的学习
                    情况做一番反思与评价呀~!
                </div>
                <div>
                    主要从课堂学习、课前预习、复习巩固与作业练习
                    几个方面进行自我反思与评价。坚持认真反思，知晓自身优劣，及时改进不
                    足，才能促使学习不断进步
                </div>
               <Divider />
                <h2 className="text-center font-bold text-lg text-blue-500">课堂学习情况（语文）</h2>
                <Form.Item label="专注听讲">
                    <Radio.Group>
                        <Radio value={1}>很不满意</Radio>
                        <Radio value={2}>不满意</Radio>
                        <Radio value={3}>一般</Radio>
                        <Radio value={4}>满意</Radio>
                        <Radio value={5}>很满意</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="认真思考">
                    <Radio.Group>
                        <Radio value={1}>很不满意</Radio>
                        <Radio value={2}>不满意</Radio>
                        <Radio value={3}>一般</Radio>
                        <Radio value={4}>满意</Radio>
                        <Radio value={5}>很满意</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="积极参与">
                    <Radio.Group>
                        <Radio value={1}>很不满意</Radio>
                        <Radio value={2}>不满意</Radio>
                        <Radio value={3}>一般</Radio>
                        <Radio value={4}>满意</Radio>
                        <Radio value={5}>很满意</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="内容掌握度">
                    <Radio.Group>
                        <Radio value={1}>很不满意</Radio>
                        <Radio value={2}>不满意</Radio>
                        <Radio value={3}>一般</Radio>
                        <Radio value={4}>满意</Radio>
                        <Radio value={5}>很满意</Radio>
                    </Radio.Group>
                </Form.Item>
                <Divider />
                <h2 className="text-center font-bold text-lg text-blue-500">课堂学习情况（数学）</h2>
                <Form.Item label="专注听讲">
                    <Radio.Group>
                        <Radio value={1}>很不满意</Radio>
                        <Radio value={2}>不满意</Radio>
                        <Radio value={3}>一般</Radio>
                        <Radio value={4}>满意</Radio>
                        <Radio value={5}>很满意</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="认真思考">
                    <Radio.Group>
                        <Radio value={1}>很不满意</Radio>
                        <Radio value={2}>不满意</Radio>
                        <Radio value={3}>一般</Radio>
                        <Radio value={4}>满意</Radio>
                        <Radio value={5}>很满意</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="积极参与">
                    <Radio.Group>
                        <Radio value={1}>很不满意</Radio>
                        <Radio value={2}>不满意</Radio>
                        <Radio value={3}>一般</Radio>
                        <Radio value={4}>满意</Radio>
                        <Radio value={5}>很满意</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="内容掌握度">
                    <Radio.Group>
                        <Radio value={1}>很不满意</Radio>
                        <Radio value={2}>不满意</Radio>
                        <Radio value={3}>一般</Radio>
                        <Radio value={4}>满意</Radio>
                        <Radio value={5}>很满意</Radio>
                    </Radio.Group>
                </Form.Item>
                <Divider />
                <h2 className="text-center font-bold text-lg text-blue-500">课堂学习情况（英语）</h2>
                <Form.Item label="专注听讲">
                    <Radio.Group>
                        <Radio value={1}>很不满意</Radio>
                        <Radio value={2}>不满意</Radio>
                        <Radio value={3}>一般</Radio>
                        <Radio value={4}>满意</Radio>
                        <Radio value={5}>很满意</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="认真思考">
                    <Radio.Group>
                        <Radio value={1}>很不满意</Radio>
                        <Radio value={2}>不满意</Radio>
                        <Radio value={3}>一般</Radio>
                        <Radio value={4}>满意</Radio>
                        <Radio value={5}>很满意</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="积极参与">
                    <Radio.Group>
                        <Radio value={1}>很不满意</Radio>
                        <Radio value={2}>不满意</Radio>
                        <Radio value={3}>一般</Radio>
                        <Radio value={4}>满意</Radio>
                        <Radio value={5}>很满意</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="内容掌握度">
                    <Radio.Group>
                        <Radio value={1}>很不满意</Radio>
                        <Radio value={2}>不满意</Radio>
                        <Radio value={3}>一般</Radio>
                        <Radio value={4}>满意</Radio>
                        <Radio value={5}>很满意</Radio>
                    </Radio.Group>
                </Form.Item>
                <Divider />
                <h2 className="text-center font-bold text-lg text-blue-500">课前预习情况</h2>
                    <Form.Item label="预习时长（分钟）">
                        <InputNumber min={0} />
                    </Form.Item>
                    <Form.Item label="完成度">
                        <Radio.Group>
                            <Radio value={0}>0%</Radio>
                            <Radio value={25}>25%</Radio>
                            <Radio value={50}>50%</Radio>
                            <Radio value={75}>75%</Radio>
                            <Radio value={100}>100%</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="学习材料通读">
                        <Slider min={0} max={10} />
                    </Form.Item>
                    <Form.Item label="重点标注">
                        <Slider min={0} max={10} />
                    </Form.Item>
                    <Form.Item label="主动提出疑问">
                        <Slider min={0} max={10} />
                    </Form.Item>
                    <Divider />
                    <h2 className="text-center font-bold text-lg text-blue-500">作业练习情况</h2>
                    <Form.Item label="预习时长（分钟）">
                        <InputNumber min={0} />
                    </Form.Item>
                    <Form.Item label="完成度">
                        <Radio.Group>
                            <Radio value={0}>0%</Radio>
                            <Radio value={25}>25%</Radio>
                            <Radio value={50}>50%</Radio>
                            <Radio value={75}>75%</Radio>
                            <Radio value={100}>100%</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="学习材料通读">
                        <Slider min={0} max={10} />
                    </Form.Item>
                    <Form.Item label="重点标注">
                        <Slider min={0} max={10} />
                    </Form.Item>
                    <Form.Item label="主动提出疑问">
                        <Slider min={0} max={10} />
                    </Form.Item>
                    <Divider />
                    <h2 className="text-center font-bold text-lg text-blue-500">自我评价与反馈</h2>
                    <Form.Item label="自我评分">
                        <Rate />
                    </Form.Item>
                    <Form.Item label="反馈内容">
                        <Input.TextArea rows={4} placeholder="说说你的评价" maxLength={200} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" onClick={onFinish}>提交</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}

export default FeedForm;