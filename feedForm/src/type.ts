export interface UserLearningData {
    openid: string;
    chineseLearnDegree: number;
    mathLearnDegree: number;
    englishLearnDegree: number;
    coursePreviewDuration: number;
    coursePreviewCompletion: number;
    coursePreviewReadMaterial: number;
    coursePreviewMark: number;
    coursePreviewAskQuestion: number;
    reviewedDuration: number;
    reviewedCompletion: number;
    reviewedNewKnowledge: number;
    reviewedLeakFilling: number;
    reviewedCarding: number;
    homeworkPracticeDuration: number;
    homeworkPracticeCompletion: number;
    homeworkPracticeFinish: number;
    homeworkPracticeFocus: number;
    homeworkPracticeCheck: number;
    selfEvalReflect: number;
    selfEvalMessage: string;
    createTime: string;
  //  updateTime: string;
}