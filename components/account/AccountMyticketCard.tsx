"use client"

import { Card, CardBody, CardHeader } from "@nextui-org/card"
import { Tab, Tabs } from "@nextui-org/tabs"

export default function AccountMyticketCard() {
    return (
        <div>
            <Tabs>
                <Tab key="upcomming" title="UPCOMMING EVENTS">
                    <Card>
                        <CardHeader>
                            <h2 className="font-bold uppercase">upcomming events</h2>
                        </CardHeader>
                        <CardBody>
                    
                        </CardBody>
                    </Card>
                </Tab>
                <Tab key="past" title="PAST EVENTS">
                    <Card>
                        <CardHeader>
                            <h2 className="font-bold uppercase">past events</h2>
                        </CardHeader>
                        <CardBody>
                            
                        </CardBody>
                    </Card>
                </Tab>
            </Tabs>
        </div>

    )
}
