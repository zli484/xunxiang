export default function Testimonials() {
  return (
    <section className="bg-white py-24 sm:py-32 px-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col pb-10 sm:pb-16 lg:pb-0 lg:pr-8 xl:pr-20">
            <figure className="mt-10 flex flex-auto flex-col justify-between">
              <blockquote className="text-lg leading-8 text-gray-900">
                <p className="text-sm">
                  “人生的路总是孤独，但有志同道合的人，不论怎样都会精彩。来到寻向后，我意识到我们并不孤单，也不是一个人在战斗。在寻向，努力认真的学弟学妹激励着我，同龄人的理想激励着我，寻向作为一个互帮互助的团体，不断给予我继续向上的动力。同样，在如此特殊的留学环境下，寻向的存在给予了这个团体中的每一个成员坚持的勇气、成功的信心，以及对美好未来的希望。作为一名领队，我很开心能跟寻向一起成长、一起进步。愿终有一天，寻向的名字可以和埋藏在大家心中的梦想一起，发光发热。”
                </p>
              </blockquote>
              <figcaption className="mt-10 flex items-center gap-x-6">
                <img
                  className="h-14 w-14 rounded-full bg-gray-50"
                  src="/img/testimonials/profile_avatars/belinda_hu_profile.jpeg"
                  alt=""
                />
                <div className="text-base">
                  <div className="font-semibold text-gray-900">Belinda Hu</div>
                  <div className="mt-1 text-gray-500">
                    就职于International Monetary Fund 寻向领队
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>
          <div className="flex flex-col border-t border-gray-900/10 pt-10 sm:pt-16 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0 xl:pl-20">
            <figure className="mt-10 flex flex-auto flex-col justify-between">
              <blockquote className="text-lg leading-8 text-gray-900">
                <p className="text-sm">
                  “寻向的大家都很暖，寻求帮助的时候大家都会竭尽所能。寻向的大家都很强，各行各业优秀的同学都在向着自己的目标和理想努力。寻向的大家都很会，所有话题都能遇到能侃侃而谈，迸发火花的人。从学长学姐那里获得帮助再进而用自己知道的帮助学弟学妹，我在寻向看到了无私传承。所以，寻向入股不亏！”
                </p>
              </blockquote>
              <figcaption className="mt-10 flex items-center gap-x-6">
                <img
                  className="h-14 w-14 rounded-full bg-gray-50"
                  src="/img/testimonials/profile_avatars/karen_zheng_profile.jpeg"
                  alt=""
                />
                <div className="text-base">
                  <div className="font-semibold text-gray-900">Karen Zheng</div>
                  <div className="mt-1 text-gray-500">
                    就读于University of Pennsylvania 寻向练习生
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
